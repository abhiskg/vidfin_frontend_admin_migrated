import { useQueryCourseSections } from "@/api/use-course-curriculum-api";
import { useAddCourseResourceMutation } from "@/api/use-course-resource-api";
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
  courseResourceFormSchema,
  type ICourseResourceForm,
} from "@/types/course-resource.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  course_id: string;
}

export function CourseManagementResourceAddDialog({
  isOpen,
  setIsOpen,
  course_id,
}: Props) {
  const { id } = useParams();
  const { data: courseSections } = useQueryCourseSections(id || "");

  const form = useForm<ICourseResourceForm>({
    resolver: zodResolver(courseResourceFormSchema),
    defaultValues: {
      resource_title: "",
      section_id: "",
      chapter_id: "",
      file: undefined,
    },
    mode: "onChange",
  });
  const { mutate, isPending: isMutationPending } =
    useAddCourseResourceMutation(course_id);

  const selectedSectionId = form.watch("section_id");

  const selectedSectionIndex = courseSections?.findIndex(
    (section) => section.section_id.toString() === selectedSectionId,
  );

  const onSubmit = (data: ICourseResourceForm) => {
    mutate(
      {
        course_id: course_id,
        ...data,
      },
      {
        onSuccess: () => {
          form.reset();
          setIsOpen(false);
        },
      },
    );
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Course Resource</DialogTitle>
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
                  // accept="application/pdf"
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
                {!isMutationPending ? (
                  <Button
                    type="submit"
                    className="px-[22px]"
                    disabled={!form.formState.isDirty}
                  >
                    Add Resource
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
