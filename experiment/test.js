
showSlide("instructions");


function showSlide(id) {
  // Hide all slides
	$(".slide").hide();
	// Show just the slide we want to show
	$("#"+id).show();
}

function showAgent(id, orient) {
	$(".agent").hide();
    $(".point_agent_l").hide();
    $(".point_agent_r").hide();
    $(".look_agent_l").hide();
    $(".look_agent_r").hide();

	$("#"+id+"_"+orient).show();
}

function choiceAgent(id) {
    $(".agent").hide();
    $(".point_agent_l").hide();
    $(".point_agent_r").hide();
    $(".look_agent_l").hide();
    $(".look_agent_r").hide();
	$("#"+id+"_choice").show();
}

function showEat(id) {
	$(".agent_eat").hide();
	$("#"+id+"_eat").show();
};


function sourceRightFruit(a) {
   	$(".fruit_inf_r").hide();
   	$(".fruit_inf_r2").hide();
    document.getElementById("fruit_r").src = a;
};

function showRightFruit() {
            $(".fruit_r").show();
    document.getElementById('fruit_r').style.visibility = 'visible';
};

function sourceLeftFruit(b) {
    $(".fruit_inf_l").hide();
    $(".fruit_inf_l2").hide();
    document.getElementById("fruit_l").src = b;
};

function showLeftFruit() {
            $(".fruit_l").show();
    document.getElementById('fruit_l').style.visibility = 'visible';
};

function choiceLeftFruit(a) {

    $(".fruit_inf_r").hide();
            $(".fruit_l").show();
    document.getElementById("choiceFruit_l").src = a;
};

function choiceRightFruit(a) {
            $(".fruit_r").show();
    document.getElementById("choiceFruit_r").src = a;
};

function background(x) {
        document.getElementById("background").src=x;
    };

    function background2(x) {
            document.getElementById("background2").src=x;
        };

    function pause(id,time){
        $("#"+id).hide();
        setTimeout(function() {
             $("#"+id).show();
         }, time);
      };



      function sourceSound(c) {
              document.getElementById("sound").src=c;
          };
      function playSound() {
          document.getElementById("sound").play();
            };

  function downloadData(safe) {
    		    var toSave = JSON.stringify(safe)

    				var date = new Date()
    				var day = date.getUTCDate()
    				var month = date.getUTCMonth()+1
    				var year = date.getUTCFullYear()
    				var hour = date.getHours()
    				var minute = date.getMinutes()

    		    var hiddenElement = document.createElement('a');
    		    hiddenElement.href = 'data:text/json;charset=utf-8,' + encodeURI(toSave);
    		    hiddenElement.target = '_blank';
    		    hiddenElement.download = year + '-' + month + '-' + day + '-' + hour + '-' + minute + '-' +  me.subid+'_'+data.task+'.json';
    		    hiddenElement.click();
    	}


var me = {
  trial: [1,2],
  agents: ["Monkey","Bunny"],
  agentOrient: [
          ["straight","down"],
          ["straight","down"]],
  novels: ["t22","t21"],
  familiars: ["carrot","duck"],
  back: [6,7],
  novelPos: ["left", "right"],
  data: [],



// end of the experiment
  end: function() {
    // Show the finish slide.
    showSlide("finished");
    setTimeout(function() { downloadData(me.data) }, 500);
  },


// what happens between trials - display agent from previous trial and click on it to move on to the next trial
   eat: function(event) {

    setTimeout(function() {me.eat2() }, 1500);

    showSlide("choice");

    event.target.style.border = '5px solid blue';

    sourceSound("sound/end.mp3");
    playSound();


    $(".fruit_r").unbind("click");
    $(".fruit_l").unbind("click");

      var pick_src = event.target.src;
    // get time for reaction time



    // Code correct: does name of chosen object contain the name of the correct object
    if (pick_src.indexOf(me.novels[0]) > -1) {
        var correct =1
        var pick = me.novels[0]
        } else {
        var correct = 0
        var pick = me.familiars[0]
        };

       if (me.novelPos[0] == "left"){
        var LeftFruit = me.novels[0];
        var RightFruit = me.familiars[0];

    } else  {

        var LeftFruit = me.familiars[0];
        var RightFruit = me.novels[0];
    }



    // data collected
      data = {
        subid: me.subid,
        subage: me.subage,
        task: "mutual_exclusivity",
        trial: me.trial[0],
        agent: me.agents[0],
        leftObject: LeftFruit,
        rightObject: RightFruit,
        correct_location: me.novelPos[0],
        pick: pick,
        correct: correct
            };
      me.data.push(data);

  },

eat2: function(event) {

    showSlide("eat");

   background("images/back"+me.back[0]+".jpg");

    sourceSound("sound/end.mp3");
    playSound();

    showEat(me.agents[0])

    $(".agent_eat").click(me.newtrial);

},

// unbind and shift variables between trials
 newtrial: function() {

    $(".fruit_l").css("border","none")

    $(".fruit_r").css("border","none")


    $(".agent_eat").unbind("click");


    sourceLeftFruit("images/empty.png");
            showLeftFruit();
    sourceRightFruit("images/empty.png");
            showRightFruit();



    me.trial.shift();
    me.agentOrient.shift();
    me.agents.shift();
    me.novelPos.shift();
    me.novels.shift();
    me.familiars.shift();
    me.back.shift();




   me.next();
  },


// recording the choice
  choice: function(event) {

    showSlide("choice");

      $(".tree_l_c").hide();
      $(".tree_r_c").hide();
      $(".selector_l").hide();
      $(".selector_r").hide();


    background2("images/back"+me.back[0]+".jpg");

      showAgent(me.agents[0],"choice");

    // specify what is shown on the tables depending on training and test condition
    if (me.novelPos[0] == "left"){

        choiceLeftFruit("images/"+me.novels[0]+".png");

        choiceRightFruit("images/"+me.familiars[0]+".png");

        } else {

        choiceLeftFruit("images/"+me.familiars[0]+".png");

        choiceRightFruit("images/"+me.novels[0]+".png");

        }


    // play choice sound

        sourceSound("sound/"+me.agents[0]+"_me_choice.mp3");
 playSound();

    // choice can be made by clicking the objects after - possible after 5s
    setTimeout(function() {
        $(".fruit_l").click(me.eat);

        $(".fruit_r").click(me.eat);

    }, 000);
  },

// moving on within a trial

  next: function() {
$(".moveButton").unbind("click");
   // when no more trials are left, end experiment
    if (me.trial.length == 0){
        setTimeout(function() {me.end() }, 0);
      return;
    };

  // after exposure is finished, switch to choice
    if (me.agentOrient[0][0] == "down") {
      setTimeout(function() {me.choice() }, 0);
      return;
    };

    showSlide("stage");

          	$(".tree_l").hide();
    	$(".tree_r").hide();

    background("images/back"+me.back[0]+".jpg")

    // show agent
    showAgent(me.agents[0],me.agentOrient[0][0]);

    // play hello sound and write name of agent
   if (me.agentOrient[0][0] == "straight") {
        pause("moveButton",1600);
        sourceSound("sound/"+me.agents[0]+"_hello.mp3");
        playSound();
    };

    // display obejcts on table depending on training and test condition

    if (me.novelPos[0] == "left"){
        sourceLeftFruit("images/"+me.novels[0]+".png");
        showLeftFruit();

        sourceRightFruit("images/"+me.familiars[0]+".png");
        showRightFruit();

    } else  {
        sourceLeftFruit("images/"+me.familiars[0]+".png");
        showLeftFruit();

        sourceRightFruit("images/"+me.novels[0]+".png");
        showRightFruit();
    }


    // move on to next phase of exposure
    me.agentOrient[0].shift();
             $(".moveButton").click(me.next);
  },

  checkInput: function() {
  //subject ID
  if (document.getElementById("subjectID").value.length < 1) {
    $("#checkMessage").html('<font color="red">Bitte Kind ID eintragen</font>');
    return;
  }
      if (document.getElementById("subjectAge").value.length < 1) {
    $("#checkMessage").html('<font color="red">Bitte Alter des Kindes eingeben</font>');
    return;
  }
  me.subid = document.getElementById("subjectID").value
      me.subage = document.getElementById("subjectAge").value
      me.next()
    }
};
