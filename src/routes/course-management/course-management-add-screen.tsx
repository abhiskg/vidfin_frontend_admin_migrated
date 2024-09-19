import { useAddCourseMutation, useQueryCourses } from "@/api/use-course-api";
import {
  useAddCourseCategoryMutation,
  useQueryCourseCategory,
} from "@/api/use-course-category-api";
import { useQuerySubscriptions } from "@/api/use-subscription-api";
import { FormCheckbox } from "@/components/form/form-checkbox";
import { FormInput } from "@/components/form/form-input";
import { FormInputFile } from "@/components/form/form-input-file";
import { FormMultipleSelect } from "@/components/form/form-multiple-select";
import { FormRichTextEditor } from "@/components/form/form-rich-text-editor";
import { FormSelect } from "@/components/form/form-select";
import { FormTextarea } from "@/components/form/form-textarea";
import { Icons } from "@/components/icon";
import { PageLoader } from "@/components/loader/page-loader";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { courseSubtitles } from "@/constants/course-constant";
import { availableLanguages } from "@/constants/language-constant";
import { courseFormSchema, type ICourseForm } from "@/types/course.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function CourseManagementAddScreen() {
  const { data: subscriptions, isPending: isSubscriptionPending } =
    useQuerySubscriptions();
  const { data: courses, isPending: isCoursePending } = useQueryCourses();
  const { data: categories, isPending: isCategoryPending } =
    useQueryCourseCategory();

  const navigate = useNavigate();

  const form = useForm<ICourseForm>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      course_name: "",
      creator_name: "",
      available_for_plans: [],
      summary: "",
      what_you_learn: "",
      description: "",
      about: "",
      language: "",
      subtitle: "",
      similer_courses: [],
      slug: "",
      videoid: "",
      tags: "",
      preview_thumbnail: undefined,
      categories: [],
    },
  });
  const { isPending, mutate } = useAddCourseMutation();
  const { mutate: mutateCategory, isPending: isCategoryMutationPending } =
    useAddCourseCategoryMutation();

  const onSubmit = (data: ICourseForm) => {
    // If subtitle_file is undefined, remove it from the form data

    const categories = data.categories;
    mutate(data, {
      onSuccess: (res) => {
        if (categories?.length) {
          mutateCategory(
            {
              category_ids: categories.map((category) => parseInt(category)),
              course_id: res.data.course.course_id,
            },
            {
              onSuccess: () => {
                form.reset();
                navigate("/course-management");
              },
            },
          );
        } else {
          form.reset();
          navigate("/course-management");
        }
      },
    });
  };

  if (isSubscriptionPending || isCoursePending || isCategoryPending) {
    return <PageLoader />;
  }

  return (
    <div className="mt-2">
      <Breadcrumbs
        segments={[
          {
            title: "Dashboard",
            href: "/",
          },
          {
            title: "Course Management",
            href: `/course-management`,
          },
          {
            title: "Add Course",
            href: `/course-management/add`,
          },
        ]}
      />
      {subscriptions && courses && categories && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
            <div className="py-3">
              <div className="grid grid-cols-2 gap-4 ">
                <div>
                  <FormInput
                    form={form}
                    placeholder="Enter course title"
                    label="Title"
                    name="course_name"
                  />
                  <FormInput
                    form={form}
                    placeholder="Enter author name"
                    label="Author"
                    name="creator_name"
                  />
                  <FormInput
                    form={form}
                    placeholder="Enter Slug"
                    label="Slug"
                    name="slug"
                  />
                  <FormInput
                    form={form}
                    placeholder="tag1#tag2#tag3"
                    label="Tags"
                    name="tags"
                  />
                </div>
                <div>
                  <FormSelect
                    form={form}
                    label="Language"
                    name="language"
                    options={availableLanguages}
                    placeholder="Select Language"
                  />
                  <FormSelect
                    form={form}
                    placeholder="Select Subtitle"
                    label="Subtitle Language"
                    name="subtitle"
                    options={courseSubtitles}
                  />
                  <FormInputFile
                    form={form}
                    label="Thumbnail"
                    name="preview_thumbnail"
                  />
                  <FormInput
                    form={form}
                    label="Preview Video ID"
                    name="videoid"
                    placeholder="Enter preview video id"
                  />
                </div>
              </div>
              <FormMultipleSelect
                form={form}
                name="similer_courses"
                label="Similar Courses"
                placeholder="Select Similar Courses"
                options={courses.filter((course) => course.status === "published").map((course) => ({
                  label: course.course_name,
                  value: course.course_id.toString(),
                }))}
              />
              <FormCheckbox
                form={form}
                label="Available for plans"
                name="available_for_plans"
                options={subscriptions.map((sub) => ({
                  label: sub.title,
                  value: sub.id.toString(),
                }))}
                className=" grid grid-cols-6 gap-2"
              />
              <FormCheckbox
                form={form}
                label="Available Categories"
                name="categories"
                options={categories.map((category) => ({
                  label: category.title,
                  value: category.id.toString(),
                }))}
                className=" grid grid-cols-6 gap-2"
              />
              <FormTextarea
                form={form}
                placeholder="Enter summary"
                label="Summary"
                name="summary"
                className="min-h-[120px]"
              />
              <FormRichTextEditor
                form={form}
                label="What you learn"
                name="what_you_learn"
                className="min-h-[230px]"
              />
              <FormRichTextEditor
                form={form}
                label="Description"
                name="description"
                className="min-h-[230px]"
              />
              <FormRichTextEditor
                form={form}
                label="About the course"
                name="about"
                className="min-h-[230px]"
              />
            </div>

            {isPending || isCategoryMutationPending ? (
              <Button disabled>
                <Icons.buttonLoader className="mr-1 h-5 w-5 animate-spin stroke-card" />
                Loading...
              </Button>
            ) : (
              <Button
                type="submit"
                className="px-[22px]"
                disabled={!form.formState.isDirty}
              >
                Add Course
              </Button>
            )}
          </form>
        </Form>
      )}
    </div>
  );
}
