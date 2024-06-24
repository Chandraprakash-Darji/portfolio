// 'use client';

// import * as React from 'react';

// import { FormError } from '@/components/form-error';
// import { FormSuccess } from '@/components/form-success';
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from '@/components/ui/accordion';
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from '@/components/ui/alert-dialog';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import {
//   Command,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandSeparator,
// } from '@/components/ui/command';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from '@/components/ui/dialog';
// import { Icons } from '@/components/ui/icons';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from '@/components/ui/popover';
// import { trpc } from '@/lib/integrations/server/client';
// import { badgeStyle } from '@/lib/team/badge-style';
// import { cn } from '@/lib/utils';
// import { Category } from '@prisma/client';
// import { DialogClose } from '@radix-ui/react-dialog';
// import { Check, ChevronsUpDown, Edit2 } from 'lucide-react';
// import { nanoid } from 'nanoid';
// import { toast } from 'sonner';

// export type TMultiSelectValue = Pick<Category, 'name' | 'color' | 'id'>;

// type Props = {
//   values?: TMultiSelectValue[];
//   value: TMultiSelectValue[];
//   onValueChange: React.Dispatch<React.SetStateAction<TMultiSelectValue[]>>;
//   disabled?: boolean;
// };

// export function MultiSelect({
//   values = [],
//   value,
//   onValueChange,
//   disabled,
// }: Props) {
//   const inputRef = React.useRef<HTMLInputElement>(null);
//   const [frameworks, setFrameworks] =
//     React.useState<TMultiSelectValue[]>(values);
//   const [openCombobox, setOpenCombobox] = React.useState(false);
//   const [openDialog, setOpenDialog] = React.useState(false);
//   const [inputValue, setInputValue] = React.useState<string>('');

//   const createFramework = (name: string) => {
//     const newFramework = {
//       id: nanoid(),
//       name: name,
//       color: '#ffffff',
//     };
//     setFrameworks((prev) => [...prev, newFramework]);
//     onValueChange((prev) => [...prev, newFramework]);
//   };

//   const toggleFramework = (framework: TMultiSelectValue) => {
//     onValueChange((currentFrameworks) =>
//       !currentFrameworks.map((i) => i.id).includes(framework.id)
//         ? [...currentFrameworks, framework]
//         : currentFrameworks.filter((l) => l.id !== framework.id)
//     );
//     inputRef?.current?.focus();
//   };

//   const updateValues = (
//     framework: TMultiSelectValue,
//     newFramework: TMultiSelectValue
//   ) => {
//     onValueChange((prev) =>
//       prev.map((f) => (f.id === framework.id ? newFramework : f))
//     );
//     setFrameworks((prev) =>
//       prev.map((f) => (f.id === framework.id ? newFramework : f))
//     );
//   };

//   const deleteFramework = (framework: TMultiSelectValue) => {
//     setFrameworks((prev) => prev.filter((f) => f.id !== framework.id));
//     onValueChange((prev) => prev.filter((f) => f.id !== framework.id));
//   };

//   const onComboboxOpenChange = (value: boolean) => {
//     inputRef.current?.blur(); // HACK: otherwise, would scroll automatically to the bottom of page
//     setOpenCombobox(value);
//   };

//   return (
//     <div className="max-w-full">
//       <Popover open={openCombobox} onOpenChange={onComboboxOpenChange}>
//         <PopoverTrigger asChild>
//           <Button
//             variant="outline"
//             role="combobox"
//             aria-expanded={openCombobox}
//             className="w-full justify-between text-foreground"
//             disabled={disabled}
//           >
//             <span className="truncate">
//               {value.length === 0 && 'Select Category'}
//               {value.length === 1 && value[0].name}
//               {value.length === 2 && value.map(({ name }) => name).join(', ')}
//               {value.length > 2 && `${value.length} categories selected`}
//             </span>
//             <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent className="w-full p-0">
//           <Command loop>
//             <CommandInput
//               ref={inputRef}
//               placeholder="Search framework..."
//               value={inputValue}
//               onValueChange={setInputValue}
//             />
//             <CommandGroup className="max-h-[145px] space-y-1 overflow-auto">
//               {frameworks.map((framework) => {
//                 const isActive = value.map((i) => i.id).includes(framework.id);
//                 return (
//                   <CommandItem
//                     key={framework.id}
//                     value={framework.name}
//                     onSelect={() => toggleFramework(framework)}
//                   >
//                     <Check
//                       className={cn(
//                         'mr-2 h-4 w-4',
//                         isActive ? 'opacity-100' : 'opacity-0'
//                       )}
//                     />
//                     <div className="flex-1">{framework.name}</div>
//                     <div
//                       className="h-4 w-4 rounded-full"
//                       style={{ backgroundColor: framework.color }}
//                     />
//                   </CommandItem>
//                 );
//               })}
//               <CommandItemCreate
//                 onSelect={() => createFramework(inputValue)}
//                 {...{ inputValue, frameworks }}
//               />
//             </CommandGroup>
//             <CommandSeparator alwaysRender />
//             <CommandGroup>
//               <CommandItem
//                 value={`:${inputValue}:`} // HACK: that way, the edit button will always be shown
//                 className="text-xs text-muted-foreground"
//                 onSelect={() => setOpenDialog(true)}
//               >
//                 <div className={cn('mr-2 h-4 w-4')} />
//                 <Edit2 className="mr-2 h-2.5 w-2.5" />
//                 Edit categories
//               </CommandItem>
//             </CommandGroup>
//           </Command>
//         </PopoverContent>
//       </Popover>
//       <Dialog
//         open={openDialog}
//         onOpenChange={(open) => {
//           if (!open) {
//             setOpenCombobox(true);
//           }
//           setOpenDialog(open);
//         }}
//       >
//         <DialogContent className="flex max-h-[90vh] flex-col">
//           <DialogHeader>
//             <DialogTitle>Edit categories</DialogTitle>
//             <DialogDescription>
//               Change the Category names or delete the categories. Create a
//               Category through the combobox though.
//             </DialogDescription>
//           </DialogHeader>
//           <div className="-mx-6 flex-1 overflow-scroll px-6 py-2">
//             {frameworks.map((framework) => {
//               return (
//                 <DialogListItem
//                   key={framework.id}
//                   onDelete={() => deleteFramework(framework)}
//                   updateValues={updateValues}
//                   {...framework}
//                 />
//               );
//             })}
//           </div>
//           <DialogFooter className="bg-opacity-40">
//             <DialogClose asChild>
//               <Button variant="outline">Close</Button>
//             </DialogClose>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//       <div className="relative mt-3 overflow-y-auto">
//         {value.map(({ name, id, color }) => (
//           <Badge
//             key={id}
//             variant="outline"
//             style={badgeStyle(color)}
//             className="mb-2 mr-2"
//           >
//             {name}
//           </Badge>
//         ))}
//       </div>
//     </div>
//   );
// }

// const CommandItemCreate = ({
//   inputValue,
//   frameworks,
//   onSelect,
// }: {
//   inputValue: string;
//   frameworks: TMultiSelectValue[];
//   onSelect: () => void;
// }) => {
//   const hasNoFramework = !frameworks
//     .map(({ name }) => name.toLowerCase())
//     .includes(`${inputValue.toLowerCase()}`);

//   const render = inputValue !== '' && hasNoFramework;

//   if (!render) return null;

//   // BUG: whenever a space is appended, the Create-Button will not be shown.
//   return (
//     <CommandItem
//       key={`${inputValue}`}
//       value={`${inputValue}`}
//       className="text-xs text-muted-foreground"
//       onSelect={onSelect}
//     >
//       <div className={cn('mr-2 h-4 w-4')} />
//       Create new Category &quot;{inputValue}&quot;
//     </CommandItem>
//   );
// };

// const DialogListItem = ({
//   id,
//   name,
//   color,
//   updateValues,
//   onDelete,
// }: TMultiSelectValue & {
//   updateValues: (
//     framework: TMultiSelectValue,
//     newFramework: TMultiSelectValue
//   ) => void;
//   onDelete: () => void;
// }) => {
//   const inputRef = React.useRef<HTMLInputElement>(null);
//   const [accordionValue, setAccordionValue] = React.useState<string>('');
//   const [inputValue, setInputValue] = React.useState<string>(name);
//   const [colorValue, setColorValue] = React.useState<string>(color);
//   const disabled = name === inputValue && color === colorValue;

//   const [deleteAlert, setDeleteAlert] = React.useState(false);

//   const { error, isSuccess, isPending, mutate } =
//     trpc.updateCategory.useMutation();
//   const {
//     error: deleteError,
//     isSuccess: deleteSuccess,
//     isPending: deleting,
//     mutate: deleteCategory,
//   } = trpc.deleteCategory.useMutation();

//   React.useEffect(() => {
//     if (accordionValue !== '') {
//       inputRef.current?.focus();
//     }
//   }, [accordionValue]);

//   return (
//     <Accordion
//       key={id}
//       type="single"
//       collapsible
//       value={accordionValue}
//       onValueChange={setAccordionValue}
//     >
//       <AccordionItem value={id}>
//         <div className="flex items-center justify-between">
//           <div>
//             <Badge variant="outline" style={badgeStyle(color)}>
//               {name}
//             </Badge>
//           </div>
//           <div className="flex items-center gap-4">
//             <AccordionTrigger className="text-sm">Edit</AccordionTrigger>
//             <Button
//               onClick={() => setDeleteAlert(true)}
//               variant="destructive"
//               size="xs"
//             >
//               Delete
//             </Button>
//             <AlertDialog open={deleteAlert}>
//               <AlertDialogContent>
//                 <AlertDialogHeader>
//                   <AlertDialogTitle>Are you sure sure?</AlertDialogTitle>
//                   <AlertDialogDescription>
//                     You are about to delete the Category{' '}
//                     <Badge variant="outline" style={badgeStyle(color)}>
//                       {name}
//                     </Badge>{' '}
//                     .
//                   </AlertDialogDescription>
//                 </AlertDialogHeader>
//                 <AlertDialogFooter>
//                   <AlertDialogCancel disabled={deleting}>
//                     Cancel
//                   </AlertDialogCancel>
//                   <AlertDialogAction
//                     onClick={() => {
//                       deleteCategory(
//                         { id },
//                         {
//                           onSuccess: (data) => {
//                             if ('name' in data) {
//                               toast.success(
//                                 `Category ${data.name} has been deleted.`
//                               );
//                               onDelete();
//                               setDeleteAlert(false);
//                             }
//                             if ('error' in data) {
//                               toast.error(data.error);
//                             }
//                           },
//                         }
//                       );
//                     }}
//                   >
//                     {deleting && (
//                       <Icons.spinner className="mr-2 animate-spin" />
//                     )}
//                     Delete
//                   </AlertDialogAction>
//                 </AlertDialogFooter>
//               </AlertDialogContent>
//             </AlertDialog>
//           </div>
//         </div>
//         <AccordionContent>
//           <form
//             className="flex items-end gap-4"
//             onSubmit={async (e) => {
//               e.preventDefault();
//               const target = e.target as typeof e.target &
//                 Record<'name' | 'color', { value: string }>;
//               const newFramework = {
//                 id: id,
//                 name: target.name.value,
//                 color: target.color.value,
//               };
//               mutate(newFramework, {
//                 onSuccess: (data) => {
//                   updateValues(
//                     { id, name, color },
//                     {
//                       id: data.id,
//                       name: data.name,
//                       color: data.color,
//                     }
//                   );
//                 },
//               });
//               setAccordionValue('');
//             }}
//           >
//             <div className="grid w-full gap-3">
//               <Label htmlFor="name">Label name</Label>
//               <Input
//                 ref={inputRef}
//                 id="name"
//                 value={inputValue}
//                 onChange={(e) => setInputValue(e.target.value)}
//                 className="h-8"
//                 disabled={isPending}
//               />
//             </div>
//             <div className="grid gap-3">
//               <Label htmlFor="color">Color</Label>
//               <Input
//                 id="color"
//                 type="color"
//                 value={colorValue}
//                 onChange={(e) => setColorValue(e.target.value)}
//                 className="h-8 px-2 py-1"
//                 disabled={isPending}
//               />
//             </div>
//             {/* REMINDER: size="xs" */}
//             <Button type="submit" disabled={disabled || isPending} size="xs">
//               {isPending && <Icons.spinner className="mr-2 animate-spin" />}
//               Save
//             </Button>
//           </form>
//         </AccordionContent>
//         {error && <FormError message={error.message} />}
//         {isSuccess && <FormSuccess message="Updated template Description." />}
//         {deleteError && <FormError message={deleteError.message} />}
//         {deleteSuccess && <FormSuccess message="Deleted template Category" />}
//       </AccordionItem>
//     </Accordion>
//   );
// };
