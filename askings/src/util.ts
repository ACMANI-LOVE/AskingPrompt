// +=========+=========+=========+=========+=========
// string Manage
// +=========+=========+=========+=========+=========
export function zeroPads(data:number, size?:number) {
  return (data).toString().padStart(size ?? 2,"0")
}
// +=========+=========+=========+=========+=========
// random Manage
// +=========+=========+=========+=========+=========
export function eightString () {
  const chara = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const text = Array.from({length:8},(_)=>chara[Math.floor(Math.random()*chara.length)])
  return text.join()
}