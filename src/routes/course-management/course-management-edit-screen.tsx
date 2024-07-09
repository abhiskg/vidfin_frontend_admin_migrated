import {
  useQueryCourse,
  useQueryCourses,
  useUpdateCourseMutation,
} from "@/api/use-course-api";
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
import {
  courseEditFormSchema,
  type ICourse,
  type ICourseEditForm,
} from "@/types/course.type";
import type { ISubscription } from "@/types/subscription.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useNavigate, useParams } from "react-router-dom";

export default function CourseManagementEditScreen() {
  const { id } = useParams();
  const { data: course, isPending: isCoursePending } = useQueryCourse(id || "");
  const { data: subscriptions, isPending: isSubscriptionPending } =
    useQuerySubscriptions();

  const { data: courses, isPending: isCoursesPending } = useQueryCourses();

  if (isSubscriptionPending || isCoursePending || isCoursesPending) {
    return <PageLoader />;
  }

  return (
    <>
      {course && subscriptions && courses && (
        <CourseManagementEditForm
          course={course}
          subscriptions={subscriptions}
          courses={courses}
        />
      )}
    </>
  );
}

interface CourseManagementEditFormProps {
  course: ICourse;
  courses: ICourse[];
  subscriptions: ISubscription[];
}

function CourseManagementEditForm({
  course,
  subscriptions,
  courses,
}: CourseManagementEditFormProps) {
  const navigate = useNavigate();

  const form = useForm<ICourseEditForm>({
    resolver: zodResolver(courseEditFormSchema),
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
      videoid: course.videoid || "",
      tags: course.tags?.join("#") || "",
      preview_thumbnail: undefined,
    },
  });

  const { isPending, mutate } = useUpdateCourseMutation();

  const onSubmit = (data: ICourseEditForm) => {
    if (data.slug === course.slug) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      delete data.slug;
    }
    if (data.course_name === course.course_name) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      delete data.course_name;
    }
    mutate(
      {
        course_id: course.course_id.toString(),
        ...data,
      },
      {
        onSuccess: () => {
          navigate("/course-management");
        },
      },
    );
  };

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
            title: "Edit Course",
            href: `/course-management/${course.course_id}/view`,
          },
        ]}
      />
      {subscriptions && course && (
        <Form {...form}>
          <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
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
                    placeholder="Enter tags"
                    label="Tags"
                    name="tags"
                  />
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
                  <FormInput
                    form={form}
                    label="Preview Video ID"
                    name="videoid"
                    placeholder="Enter preview video id"
                  />
                </div>
                <div>
                  <h2 className="font-medium">Current Thumbnail</h2>
                  <img
                    src={course.preview_thumbnail}
                    alt="thumbnail"
                    className="mb-3 aspect-video max-h-[24rem] rounded-md"
                  />
                  <FormInputFile
                    form={form}
                    label="Thumbnail"
                    name="preview_thumbnail"
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
            {!isPending ? (
              <Button
                type="submit"
                className="px-[22px]"
                disabled={!form.formState.isDirty}
              >
                Update Course
              </Button>
            ) : (
              <Button disabled>
                <Icons.buttonLoader className="mr-1 h-5 w-5 animate-spin stroke-card" />
                Loading...
              </Button>
            )}
          </form>
        </Form>
      )}
    </div>
  );
}
