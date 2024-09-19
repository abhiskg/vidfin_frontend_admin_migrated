import { useQueryCourse, useQueryCourses } from "@/api/use-course-api";
import { useQueryCourseCategory } from "@/api/use-course-category-api";
import { useQuerySubscriptions } from "@/api/use-subscription-api";
import { FormCheckbox } from "@/components/form/form-checkbox";
import { FormInput } from "@/components/form/form-input";
import { FormMultipleSelect } from "@/components/form/form-multiple-select";
import { FormRichTextEditor } from "@/components/form/form-rich-text-editor";
import { FormSelect } from "@/components/form/form-select";
import { FormTextarea } from "@/components/form/form-textarea";
import { PageLoader } from "@/components/loader/page-loader";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Form } from "@/components/ui/form";
import { courseSubtitles } from "@/constants/course-constant";
import { availableLanguages } from "@/constants/language-constant";
import type { ICategory } from "@/types/category.type";
import {
  courseFormSchema,
  type ICourse,
  type ICourseForm,
} from "@/types/course.type";
import type { ISubscription } from "@/types/subscription.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useParams } from "react-router-dom";

export default function CourseManagementViewScreen() {
  const { id } = useParams();
  const { data: course, isPending: isCoursePending } = useQueryCourse(id || "");
  const { data: subscriptions, isPending: isSubscriptionPending } =
    useQuerySubscriptions();

  const { data: courses, isPending: isCoursesPending } = useQueryCourses();
  const { data: categories, isPending: isCategoryPending } =
    useQueryCourseCategory();

  if (
    isSubscriptionPending ||
    isCoursePending ||
    isCoursesPending ||
    isCategoryPending
  ) {
    return <PageLoader />;
  }

  return (
    <>
      {course && subscriptions && courses && categories && (
        <CourseManagementViewForm
          course={course}
          subscriptions={subscriptions}
          courses={courses}
          categories={categories}
        />
      )}
    </>
  );
}

interface CourseManagementViewFormProps {
  course: ICourse;
  courses: ICourse[];
  subscriptions: ISubscription[];
  categories: ICategory[];
}

function CourseManagementViewForm({
  course,
  subscriptions,
  courses,
  categories,
}: CourseManagementViewFormProps) {
  const form = useForm<ICourseForm>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      course_name: course.course_name || "",
      creator_name: course.creator_name || "",
      available_for_plans: course.available_for_plans || [],
      summary: course.summary || "",
      what_you_learn: course.what_you_learn || "",
      description: course.description || "",
      about: course.about || "",
      language: course.language || "",
      subtitle: course.subtitle || "",
      similer_courses:
        course.similer_courses.map((courseId: string) => ({
          value: courseId,
          label: courses.find((c) => c.course_id.toString() === courseId)
            ?.course_name,
        })) || [],

      slug: course.slug || "",
      tags: course.tags?.join("#") || "",
      videoid: course.videoid || "",
    },
  });

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
            title: "View Course",
            href: `/course-management/${course.course_id}/view`,
          },
        ]}
      />
      {subscriptions && course && (
        <Form {...form}>
          <form noValidate>
            <div className="py-3">
              <div className="grid grid-cols-2 gap-4 ">
                <div>
                  <FormInput
                    form={form}
                    placeholder="Enter course title"
                    label="Title"
                    name="course_name"
                    disabled
                  />
                  <FormInput
                    form={form}
                    placeholder="Enter author name"
                    label="Author"
                    name="creator_name"
                    disabled
                  />
                  <FormInput
                    form={form}
                    placeholder="Enter Slug"
                    label="Slug"
                    name="slug"
                    disabled
                  />
                  <FormInput
                    form={form}
                    placeholder="Enter tags"
                    label="Tags"
                    name="tags"
                    disabled
                  />

                  <FormSelect
                    form={form}
                    label="Language"
                    name="language"
                    options={availableLanguages}
                    placeholder="Select Language"
                    disabled
                  />
                  <FormSelect
                    form={form}
                    placeholder="Select Subtitle"
                    label="Subtitle Language"
                    name="subtitle"
                    options={courseSubtitles}
                    disabled
                  />
                </div>
                <div>
                  <h2 className="font-medium">Current Thumbnail</h2>
                  <img
                    src={course.preview_thumbnail}
                    alt="thumbnail"
                    className="mb-3 aspect-video max-h-[24rem] rounded-md"
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
                options={courses.map((course) => ({
                  label: course.course_name,
                  value: course.course_id.toString(),
                }))}
                disabled
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
                disabled
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
                disabled
              />
              <FormTextarea
                form={form}
                placeholder="Enter summary"
                label="Summary"
                name="summary"
                className="min-h-[120px]"
                disabled
              />
              <FormRichTextEditor
                form={form}
                label="What you learn"
                name="what_you_learn"
                className="min-h-[230px]"
                disabled
              />
              <FormRichTextEditor
                form={form}
                label="Description"
                name="description"
                className="min-h-[230px]"
                disabled
              />
              <FormRichTextEditor
                form={form}
                label="About the course"
                name="about"
                className="min-h-[230px]"
                disabled
              />
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}
