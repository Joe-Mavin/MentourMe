const handleError = (err, res) => {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong!' });
  };
  
export default handleError;
  