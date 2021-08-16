export const data = {
    labels: ['Data One', 'Data Two', 'Data Three'],
    datasets: [
      {
        label: '# of Votes',
        data: [25, 25, 25, 25],
        backgroundColor: [
          '#9953B7',
          '#18AB8F',
          '#2D96D6',
          '#EEF0F6',
          
        ],
        hoverOffset:5,
        borderColor: [
            '#9953B7',
            '#18AB8F',
            '#2D96D6',
            '#EEF0F6',
         
        ],
        borderWidth: 1,
        cutout:80
      },
  
    ],
  };


  export const options = {
    maintainAspectRatio: false,
    responsive:true,
    
    plugins: {
        legend: {
            display:false,
            labels:{
                boxWidth:15,
                boxHeight:15,
                padding:20,
                display:false
            },
          position: 'bottom',
          reverse:true,
        //   boxHeight:20,
        },
       
      },
    
    // cutoutPercentage: 120,
  };
  export const Lineoptions = {
     responsive:true,
    maintainAspectRatio:false,
  elements: {
      line: {
          tension: 0.3
      }
  },
  plugins: {
      legend: {
        display: false
      }
    },
  scales: {
      x: {
      
          grid:{
           display:false,
           drawBorder:false
               }
,
               ticks: {
                 
                  font: {
                      size: 15,
                  },
             
                },

         },
      y: 
         {
          afterFit: function(scale) {
              // scale.paddingRight=600  //<-- set value as you wish 
              console.log(scale)
           },

       grid:{
          borderDash: [8, 4],
          drawBorder:false
            },
            ticks: {
              reverse: false,
              stepSize: 4000,
              font: {
                  size: 15,
              },
         
            },
         }
             
      
      }
}


    
export const Linedata = (canvas)=>{
    let CTX=document.querySelector(".chart-line canvas").getContext("2d");
var gradient = CTX.createLinearGradient(0, 140, 0, 220);
gradient.addColorStop(0, '#D1E9F7');   

gradient.addColorStop(1, '#ECF6FC');

return{
labels: ["January", "February", "March", "April", "May", "June","July","August"],
datasets: [
  {
    label: "First dataset",
    data: [3000,3000,9000,7000,6000,6500,8000,9500],
    fill: true,
    
    backgroundColor: gradient,
    borderColor: "#2D98DA"
  },

]
}
};
