module.exports = {
  alphabet: string => {
    //maybe trim the leading and ending spaces
    //allows for last name to have space in the middle but not start, end nor double spaces
    const alphabet_REGEX = /^[a-zA-Z_]+( [a-zA-Z_]+)*$/;
    // return new Promise((resolve, reject) => {
    //   resolve(alphabet_REGEX.test(string));
    // });
    return alphabet_REGEX.test(string);
  },
  phoneNumber: phoneNumber => {
    //works with just about any phone number in any formate, includes exstentions too.
    const phone_REGEX =
      /(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?$/;
    return phone_REGEX.test(phoneNumber);
  },
  email: email => {
    const email_REGEX =
      /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    return email_REGEX.test(email);
  },
};
