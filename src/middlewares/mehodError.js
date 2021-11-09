
const methodError = (req, res, next) => {
  const path = req.params.id;
  if(req.params.id){
    next();
  } else {
    res.status(401).json({
      error: -1,
      description: `ruta ${req.path} metodo ${req.method} no autorizada`,
    });
  }
};

module.exports = methodError;