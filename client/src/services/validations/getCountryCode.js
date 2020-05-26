export const getCountryCode = (phone, index) => {
    let code = "";

    for (let i = 0; i <= index; i++) {
        code += phone[i]
    }

    return code;
}