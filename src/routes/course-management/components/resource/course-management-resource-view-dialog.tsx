import { useQueryCourseSections } from "@/api/use-course-curriculum-api";
import { FormInput } from "@/components/form/form-input";
import { FormSelect } from "@/components/form/form-select";
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

export function CourseManagementResourceViewDialog({
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
    },
  });

  const selectedSectionId = form.watch("section_id");

  const selectedSectionIndex = courseSections?.findIndex(
    (section) => section.section_id.toString() === selectedSectionId,
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Course Section</DialogTitle>
          <Form {...form}>
            <form noValidate>
              <div className="py-3">
                <FormInput
                  form={form}
                  placeholder="Enter resource title"
                  label="Resource Title"
                  name="resource_title"
                  disabled
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
                    disabled
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
                      disabled
                    />
                  )}
                <h2 className="font-medium">Resource</h2>
                <a
                  className="mt-2 block w-full rounded-md border border-input bg-background px-4 py-1 text-center text-sm font-medium ring-offset-background transition-colors  hover:bg-accent hover:text-accent-foreground focus-visible:outline-none"
                  href={resource.resource_file}
                  download
                  target="_blank"
                >
                  Resource File
                </a>
              </div>
              <DialogFooter>
                <Button className="px-[22px]" onClick={() => setIsOpen(false)}>
                  Close
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
