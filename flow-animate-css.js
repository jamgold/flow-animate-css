import './animate.css';
import './flow-animate-css.html';
import { Template } from 'meteor/templating';

let FlowRouter;
if (Package['ostrio:flow-router-extra']) {
  FlowRouter = Package['ostrio:flow-router-extra'].FlowRouter;
} else if (Package['kadira:flow-router']) {
  FlowRouter = Package['kadira:flow-router'].FlowRouter;
}
if (FlowRouter) {
  //
  // set some defaults
  //
  FlowRouter.animationElement = 'div.animated';
  FlowRouter.animationDebug = false;
  //
  // define animations
  //
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
  // save original FlowRouter._page functions
  //
  const FlowRouterShow = FlowRouter._page.show;
  const FlowRouterRedirect = FlowRouter._page.redirect;
  //
  // https://github.com/kadirahq/flow-router/issues/318
  //
  const flowAnimateCSS = function flowAnimateCSS(original) {
    return (...args) => {
      //
      // look for a single FlowRouter.animationElement
      //
      // let flowAnimation = $(FlowRouter.animationElement).first();
      const flowAnimation = document.querySelector(FlowRouter.animationElement);
      if (flowAnimation) {
        //
        // define animationEnd event handler
        //
        const animationEnd = function(event) {
          const callOriginal = event.target == flowAnimation;
          // finish route if it is for the FlowRouter.animationElement
          if (callOriginal) {
            // remove eventHandler
            event.target.removeEventListener('animationend', animationEnd);
            // remove the animation className
            event.target.classList.remove(event.animationName);
            if (FlowRouter.animationDebug === true) console.debug(`flow-animate-css ${event.animationName} finished ${event.target.nodeName} ${callOriginal}`);

            original.apply(null, args);
          }
        }
        if (FlowRouter.animationDebug) console.debug(`flow-animate-css ${args[0]} ${flowAnimation.className}`, flowAnimation);
        //
        // determine the animationOut
        //
        let animationOut = flowAnimation.dataset.animationOut;
        if (animationOut && FlowRouter.animations[animationOut] === undefined) animationOut = 'slideOutLeft';
        if (animationOut) {
          //
          // attach event listener
          //
          flowAnimation.addEventListener('animationend', animationEnd);
          //
          // add animationOut class
          //
          flowAnimation.classList.add(animationOut);
        } else {
          if(FlowRouter.animationDebug) console.debug('flow-animate-css no animationOut');
          original.apply(null, args);
        }
        //
        // remove previous animation
        //
        // for (let a of flowAnimation.classList) {
        //   // is the class part of the animation names
        //   if (FlowRouter.animations[a]) flowAnimation.classList.remove(a);
        // }
        //
        // add animationOut class
        //
        // if(animationOut) {
        //   flowAnimation.classList.add(animationOut);
        // } else {
        //   if(FlowRouter.animationDebug) console.debug('flow-animate-css no animationOut');
        //   original.apply(null, args);
        // }
      } else {
        if (FlowRouter.animationDebug) console.debug(`flow-animate-css did not find element ${FlowRouter.animationElement}`)
        original.apply(null, args);
      }
    }
  }
  //
  // overwrite these two functions in FlowRouter
  //
  FlowRouter._page.redirect = flowAnimateCSS(FlowRouterRedirect);
  FlowRouter._page.show = flowAnimateCSS(FlowRouterShow);
}

Template.animatedRoute.onCreated(function() {
  const instance = this;
  //
  // check for route animations
  //
  instance.animation = FlowRouter.current().route.options.animation;
  if (!instance.animation) {
    instance.animation = {};
  }
  //
  // check for explicit animation names in the template call
  //
  if(instance.data.animationIn) instance.animation.in = instance.data.animationIn;
  if(instance.data.animationOut) instance.animation.out = instance.data.animationOut;
});
Template.animatedRoute.onRendered(function() {
  const instance = this;
  if (FlowRouter.animationDebug) console.debug(`${instance.view.name}.onRendered`, instance.animation);
});
Template.animatedRoute.onDestroyed(function() {
  const instance = this;
});
Template.animatedRoute.helpers({
  in() {
    const instance=Template.instance();
    return instance.animation && 'in' in instance.animation ? `${instance.animation.in}` : '';
  },
  out() {
    const instance = Template.instance();
    return instance.animation && 'out' in instance.animation ? instance.animation.out : '';
  }
});
