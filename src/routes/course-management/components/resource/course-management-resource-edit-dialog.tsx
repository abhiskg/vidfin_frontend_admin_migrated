import { useQueryCourseSections } from "@/api/use-course-curriculum-api";
import { useUpdateCourseResourceMutation } from "@/api/use-course-resource-api";
import { FormInput } from "@/components/form/form-input";
import { FormInputFile } from "@/components/form/form-input-file";
import { FormSelect } from "@/components/form/form-select";
import { Icons } from "@/components/icon";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import {
  courseResourceEditFormSchema,
  type ICourseResource,
  type ICourseResourceEditForm,
} from "@/types/course-resource.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  resource: ICourseResource;
}

export function CourseManagementResourceEditDialog({
  isOpen,
  setIsOpen,
  resource,
}: Props) {
  const { id } = useParams();
  const { data: courseSections } = useQueryCourseSections(id || "");

  const form = useForm<ICourseResourceEditForm>({
    resolver: zodResolver(courseResourceEditFormSchema),
    defaultValues: {
      chapter_id: resource.chapter_id.toString(),
      section_id: resource.section_id.toString(),
      resource_title: resource.resource_title,
      file: undefined,
    },
    mode: "onChange",
  });

  const selectedSectionId = form.watch("section_id");

  const selectedSectionIndex = courseSections?.findIndex(
    (section) => section.section_id.toString() === selectedSectionId,
  );

  const { mutate, isPending } = useUpdateCourseResourceMutation(
    resource.course_id.toString(),
  );

  const onSubmit = (data: ICourseResourceEditForm) => {
    mutate(
      {
        course_id: resource.course_id.toString(),
        resource_id: resource.resource_id.toString(),
        ...data,
      },
      {
        onSuccess: () => {
          setIsOpen(false);
        },
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Course Section</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
              <div className="py-3">
                <FormInput
                  form={form}
                  placeholder="Enter resource title"
                  label="Resource Title"
                  name="resource_title"
                />
                <FormInputFile
                  form={form}
                  label="Resource File"
                  name="file"
                  placeholder="Upload resource file"
                />
                {courseSections && (
                  <FormSelect
                    form={form}
                    label="Section"
                    placeholder="Select Section"
                    name="section_id"
                    options={courseSections?.map((section) => ({
                      label: section.section_title,
                      value: section.section_id.toString(),
                    }))}
                  />
                )}

                {form.watch("section_id") !== "" &&
                  selectedSectionIndex !== undefined &&
                  courseSections && (
                    <FormSelect
                      form={form}
                      label="Chapter"
                      placeholder="Select Chapter"
                      name="chapter_id"
                      options={courseSections[
                        selectedSectionIndex
                      ].chapters.map((chapter) => ({
                        label: chapter.chapter_title,
                        value: chapter.chapter_id.toString(),
                      }))}
                    />
                  )}
              </div>
              <DialogFooter>
                {!isPending ? (
                  <Button
                    type="submit"
                    className="px-[22px]"
                    disabled={!form.formState.isDirty}
                  >
                    Update Resource
                  </Button>
                ) : (
                  <Button disabled>
                    <Icons.buttonLoader className="mr-1 h-5 w-5 animate-spin stroke-card" />
                    Loading...
                  </Button>
                )}
              </DialogFooter>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
