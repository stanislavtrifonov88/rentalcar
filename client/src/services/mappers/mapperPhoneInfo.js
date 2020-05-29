const mapperPhoneInfo = (phoneDetails) => {
    const { country, number } = phoneDetails;

    return { country, number }
}

export default mapperPhoneInfo