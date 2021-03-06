function drawTimer(element,color,text,time){
      var c = $("#" + element)
      var container = $(c).parent();
      c.attr('width', $(container).height() ); //max width
      c.attr('height', $(container).height() ); //max height

      var canvas = document.getElementById(element);
      var context = canvas.getContext('2d');
      var x = canvas.width / 2;
      var y = canvas.height / 2;
      var radius = Math.min(x,y)*0.70;

      var start_angle = 3/2*Math.PI;
      var time_angle = 2*Math.PI / 60 * time;
        //clear previous data
        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();

        context.beginPath();
        context.strokeStyle=color;
        context.lineWidth=(Math.min(canvas.width, canvas.height)*0.01);
        context.arc(x, y, (radius + ((Math.min(canvas.width, canvas.height)*0.05) / 2)), 0, 2 * Math.PI, false);
        context.stroke();
        context.closePath();

        context.beginPath();
        context.strokeStyle=color;
        context.lineWidth=(Math.min(canvas.width, canvas.height)*0.01);
        context.arc(x, y, (radius - ((Math.min(canvas.width, canvas.height)*0.05) / 2)), 0, 2 * Math.PI, false);
        context.stroke();
        context.closePath();
        
        context.beginPath();
        context.strokeStyle=color;
        context.lineWidth=(Math.min(canvas.width, canvas.height)*0.05);
        context.arc(x,y,radius,start_angle,start_angle + time_angle,false);
        context.stroke();
        context.closePath();

        if (time == 60) {var time_text = "0"
        } else {var time_text = time.toString()};
        context.fillStyle = "white"; // font color to write the text with
        var font = "bold " + (Math.min(canvas.width, canvas.height)*0.25) +"px serif";
        context.font = font;
        // Move it down by half the text height and left by half the text width
        var width = context.measureText(time_text).width;
        var height_num = context.measureText("w").width - 5; // this is a GUESS of height
        context.fillText(time_text, x - (width/2) ,y + (height_num/2));
        
        context.fillStyle = color; // font color to write the text with
        var font = "bold " + (Math.min(canvas.width, canvas.height)*0.10) +"px serif";
        context.font = font;
        // Move it down by half the text height and left by half the text width
        var width = context.measureText(text).width;
        var height = context.measureText("w").width; // this is a GUESS of height
        context.fillText(text, x - (width/2) , y + (height_num) + (height/2));
}

function displayTimer(total_seconds) {
  $('.timer').show();
  var minutes = Math.floor(total_seconds / 60);
  var seconds = total_seconds - minutes*60;


  timer = setInterval(function() { 
    drawTimer('minutesTimer',"#34495E","MINUTES",minutes)
    drawTimer('secondsTimer',"#F1C40F","SECONDS",seconds)
    if (seconds==0) {
      if (minutes==0) {
        clearInterval(timer);
        drawTimer('minutesTimer',"#E74C3C","MINUTES",60)
        drawTimer('secondsTimer',"#E74C3C","SECONDS",60)
      }
      else {
        seconds=59;
        minutes--;
      }
    };
    seconds--;
  }, 1000)
}

