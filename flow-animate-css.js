// Write your package code here!

// Variables exported by this module can be imported by other packages and
// applications. See flow-animate-css-tests.js for an example of importing.
// export const name = 'flow-animate-css';
if (Meteor.isClient) {
  import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
  import './animate.css';

  FlowRouter.animationElement = 'div.animated';
  FlowRouter.animationDebug = false;
  FlowRouter.animations = {
    "bounce": ['Attention Seekers'],
    "flash": ['Attention Seekers'],
    "pulse": ['Attention Seekers'],
    "rubberBand": ['Attention Seekers'],
    "shake": ['Attention Seekers'],
    "swing": ['Attention Seekers'],
    "tada": ['Attention Seekers'],
    "wobble": ['Attention Seekers'],
    "bounceIn": ['Bouncing Entrances', 'incoming'],
    "bounceInDown": ['Bouncing Entrances', 'incoming'],
    "bounceInLeft": ['Bouncing Entrances', 'incoming'],
    "bounceInRight": ['Bouncing Entrances', 'incoming'],
    "bounceInUp": ['Bouncing Entrances', 'incoming'],
    "bounceOut": ['Bouncing Exits', 'outgoing'],
    "bounceOutDown": ['Bouncing Exits', 'outgoing'],
    "bounceOutLeft": ['Bouncing Exits', 'outgoing'],
    "bounceOutRight": ['Bouncing Exits', 'outgoing'],
    "bounceOutUp": ['Bouncing Exits', 'outgoing'],
    "fadeIn": ['Fading Entrances', 'incoming'],
    "fadeInDown": ['Fading Entrances', 'incoming'],
    "fadeInDownBig": ['Fading Entrances', 'incoming'],
    "fadeInLeft": ['Fading Entrances', 'incoming'],
    "fadeInLeftBig": ['Fading Entrances', 'incoming'],
    "fadeInRight": ['Fading Entrances', 'incoming'],
    "fadeInRightBig": ['Fading Entrances', 'incoming'],
    "fadeInUp": ['Fading Entrances', 'incoming'],
    "fadeInUpBig": ['Fading Entrances', 'incoming'],
    "fadeOut": ['Fading Exits', 'outgoing'],
    "fadeOutDown": ['Fading Exits', 'outgoing'],
    "fadeOutDownBig": ['Fading Exits', 'outgoing'],
    "fadeOutLeft": ['Fading Exits', 'outgoing'],
    "fadeOutLeftBig": ['Fading Exits', 'outgoing'],
    "fadeOutRight": ['Fading Exits', 'outgoing'],
    "fadeOutRightBig": ['Fading Exits', 'outgoing'],
    "fadeOutUp": ['Fading Exits', 'outgoing'],
    "fadeOutUpBig": ['Fading Exits', 'outgoing'],
    "flip": ['Flippers'],
    "flipInX": ['Flippers', 'incoming'],
    "flipInY": ['Flippers', 'incoming'],
    "flipOutX": ['Flippers', 'outgoing'],
    "flipOutY": ['Flippers', 'outgoing'],
    "lightSpeedIn": ['Lightspeed', 'incoming'],
    "lightSpeedOut": ['Lightspeed', 'outgoing'],
    "rotateIn": ['Rotating Entrances', 'incoming'],
    "rotateInDownLeft": ['Rotating Entrances', 'incoming'],
    "rotateInDownRight": ['Rotating Entrances', 'incoming'],
    "rotateInUpLeft": ['Rotating Entrances', 'incoming'],
    "rotateInUpRight": ['Rotating Entrances', 'incoming'],
    "rotateOut": ['Rotating Exits', 'outgoing'],
    "rotateOutDownLeft": ['Rotating Exits', 'outgoing'],
    "rotateOutDownRight": ['Rotating Exits', 'outgoing'],
    "rotateOutUpLeft": ['Rotating Exits', 'outgoing'],
    "rotateOutUpRight": ['Rotating Exits', 'outgoing'],
    "slideInDown": ['Sliders', 'incoming'],
    "slideInLeft": ['Sliders', 'incoming'],
    "slideInRight": ['Sliders', 'incoming'],
    "slideOutLeft": ['Sliders', 'outgoing'],
    "slideOutRight": ['Sliders', 'outgoing'],
    "slideOutUp": ['Sliders', 'outgoing'],
    "rollIn": ['Specials', 'incoming'],
    "rollOut": ['Specials', 'outgoing'],
    "hinge": ['Specials', 'outgoing'],
  }
  //
  // https://github.com/kadirahq/flow-router/issues/318
  //
  function wrapRouting(original) {
    return (...args) => {
      //
      // look for a single FlowRouter.animationElement
      //
      var flowAnimation = $(FlowRouter.animationElement).first();
      if (flowAnimation.length == 1) {
        //
        // determine the animationOut
        //
        var animationOut = flowAnimation[0].dataset.animationOut;
        if (animationOut === undefined) animationOut = 'slideOutLeft';
        if (FlowRouter.animations[animationOut] === undefined) animationOut = 'slideOutLeft';
        //
        // attach event listener
        //
        flowAnimation.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
          function(event) {
            if (FlowRouter.animationDebug === true) console.debug(`flow-animate-css ${animationOut} finished`);
            // finish route
            return original.apply(null, args);
          }
        );
        //
        // remove previous animation
        //
        for (var a of flowAnimation[0].classList) {
          if (FlowRouter.animations[a]) flowAnimation[0].classList.remove(a);
        }
        //
        // add animationOut class
        //
        flowAnimation[0].classList.add(animationOut);
      } else {
        if(FlowRouter.animationDebug)
          console.debug(`flow-animate-css did not find element ${FlowRouter.animationElement}`)
        return original.apply(null, args);
      }
    }
  }
  //
  // overwrite these two functions in FlowRouter
  //
  FlowRouter._page.redirect = wrapRouting(FlowRouter._page.redirect);
  FlowRouter._page.show = wrapRouting(FlowRouter._page.show);
}