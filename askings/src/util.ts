// +=========+=========+=========+=========+=========
import { ORDERS } from "./init/init";
// +=========+=========+=========+=========+=========
// string Manage
// +=========+=========+=========+=========+=========
export function zeroPads(data:number, size?:number) {
  return (data).toString().padStart(size ?? 2,"0")
}
export function parseNum(data:string, err?:number) {
  return isNaN(Number(data)) ? err ?? 0 : Number(data)
}
// +=========+=========+=========+=========+=========
// random Manage
// +=========+=========+=========+=========+=========
export function eightString () {
  const strings = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const text = Array.from({length:8},()=>strings[Math.floor(Math.random()*strings.length)])
  return text.join()
}
export function randBool () {
  return (Math.random()>=0.5);
}
export function randBetween (min: number, max: number) {
  const maximum = max ?? 1;
  const minimum = min ?? 0;
  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}
export function lotteryList<T> (listObj: T[], size=1): T[] {
  const shuffled  = (listObj && listObj.length > 0) ? listObj.sort(()=> 0.5 - Math.random()) : []
  const lotteries = shuffled.slice(0, size)
  return lotteries;
}
// +=========+=========+=========+=========+=========
// Date Manage
// +=========+=========+=========+=========+=========
export const getYYYYMMDD = (dateData?: Date): string => {
  const targetDate = dateData ?? new Date();
  const year = targetDate.getFullYear().toString().padStart(4, '0');
  const month = (targetDate.getMonth() + 1).toString().padStart(2, '0');
  const date = targetDate.getDate().toString().padStart(2, '0');
  return year + month + date;
};

export const getDateTime = (dateData?: Date): string => {
  const targetDate = dateData ?? new Date();
  const year = targetDate.getFullYear().toString().padStart(4, '0');
  const month = (targetDate.getMonth() + 1).toString().padStart(2, '0');
  const date = targetDate.getDate().toString().padStart(2, '0');
  const hour = targetDate.getHours().toString().padStart(2, '0');
  const minutes = targetDate.getMinutes().toString().padStart(2, '0');

  return `${year + month + date}／${hour}:${minutes}`;
};
// +=========+=========+=========+=========+=========
// json Manage
// +=========+=========+=========+=========+=========
export const chkJsonStrings = (
  value: string,
):boolean => {
  try {
    const parseData = JSON.parse(value);
    return (parseData && value && value !== '{}') ? true : false;
  } catch {
    return false;
  }
};

export const convertJsonStrings = (
  value: string,
) => {
  try {
    const parseData = JSON.parse(value);
    return value && value !== '{}'
    ? parseData
    : {};
  } catch {
    return {};
  }
};

export const downloadByJson = (value: string[]) => {
  const stringData = value
    .map((item) => {
      try {
        return item && JSON.parse(item) ? item : '{}';
      } catch {
        return '{}';
      }
    })
    .join(',');
  const data = convertJsonStrings(`[${stringData}]`) ?? {
    result: 'failed save',
  };

  // convert JsonData 2 Blob...
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json',
  });
  // generate DL link...
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  // create File name...
  const fileName = `ordered_at_${getYYYYMMDD()}.json`;
  // click automatically, and start DL...
  link.href = url;
  link.download = fileName;
  link.click();
  // revoking...
  URL.revokeObjectURL(url);
};

export const listingFromJson = (file?: File):Promise<string[]>=> {
  return new Promise((resolve, reject)=>{
    if (!file) { return reject(undefined) }
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const parsedData = JSON.parse(e.target?.result as string)
        if (Array.isArray(parsedData)) {
          const stringify = parsedData.map((item)=>JSON.stringify(item))
          resolve(stringify.slice(0,ORDERS))
        }
      } catch (err) {
        return reject(err)
      }
    }

    reader.onerror = () => {
      reject(undefined)
    }

    reader.readAsText(file)
  })
}