export const auth = (req:any, res:any, next:any) =>{

    const auth = {name: 'Mateo', lastname: 'Quintero'}

    // Get login and password from headers
    const name = (req.headers.authorization || '').split(' ')[0] || ''
    const lastname = (req.headers.authorization || '').split(' ')[1] || ''
  
    // Verify login and password are set and correct
    if (name && lastname && name === auth.name && lastname === auth.lastname) {
      return next()
    }
  
    // Access denied...
    res.status(401).send('Authentication required.')
}