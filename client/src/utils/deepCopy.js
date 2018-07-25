/**
 * Creates a deep copy of an object. Fails when properties are methods or dates
 * @param    {Object}   inputObject   Input object to copy
 * @returns  {Object}            The copy
*/
export default inputObject => JSON.parse(JSON.stringify(inputObject));
