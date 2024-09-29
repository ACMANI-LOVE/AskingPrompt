// +=========+=========+=========+=========+=========
// string Manage
// +=========+=========+=========+=========+=========
export function zeroPads(data:number, size?:number) {
  return (data+1).toString().padStart(size ?? 2,"0")
}