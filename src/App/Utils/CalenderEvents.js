export const events = [
    { 
     
        title: "Make something better", 
        description: 'first description' ,
        start: getDate("YEAR-MONTH-02"),
        end: getDate("YEAR-MONTH-07"),
     
     },
 
    {
 
      title: "Make something better",
      description: 'first description' ,
      start: getDate("YEAR-MONTH-16"),
      end: getDate("YEAR-MONTH-19"),

    },
   
    {

        title: "Make something better",
        description: 'first description' ,
        start: getDate("YEAR-MONTH-29"),
        end:getDate("YEAR-MONTH-32")   
      },

  ];
  
  function getDate(dayString) {
    const today = new Date();
    const year = today.getFullYear().toString();
    let month = (today.getMonth() + 1).toString();
  
    if (month.length === 1) {
      month = "0" + month;
    }
  
    return dayString.replace("YEAR", year).replace("MONTH", month);
  }
  
  export default events;
  