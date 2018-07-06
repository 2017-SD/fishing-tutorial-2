/** print function for debugging purposes. */
export default function print(caller, msg="", e=0) {
    if (e === 1) console.error(caller, ": ",  msg)
    else console.log(caller, ": ",  msg)
}