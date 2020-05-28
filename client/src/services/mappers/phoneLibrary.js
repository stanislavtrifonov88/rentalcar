const mappedPhoneInfo = (phoneDetails) => {
    const { country, number } = phoneDetails;

    return { country, number }
}

export default mappedPhoneInfo