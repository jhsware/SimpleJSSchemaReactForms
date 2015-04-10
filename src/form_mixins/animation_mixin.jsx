'use strict';

/*
    Animating height is a lot harder than it seems. I tried using state, but failed
    because this.setState didn't trigger a re-render when called from the animation
    hooks. Using jQuery to create the animation has the benefit of making the component
    a bit cleaner because we don't have to add messy state and styling attributes
    to the component.

    All you need to do to use this mixin is to add it to your component and show
    what bemisch base css class name you want to use:

    mixins: [CollapseHeightMixin],
    animationClassName: "collapse-height",

    The following classes are needed in this example:

    Base styling of your component you want to collapse:

        .notifications__message {
            display: block; // IMPORTANT! Must be display block to create a smooth animation
        }

    Add the animations that you want (currently the first one to complete will trigger
    the component animation done call)

        .collapse-height--animating {
            transition: height 0.5s, padding 0.5s, opacity 0.7s, margin 0.5s;
        }

    Add the styling you want for a collapsed element

        .collapse-height--collapsed {
            overflow: hidden;
            height: 0 !important;
            padding-top: 0 !important;
            padding-bottom: 0 !important;
            margin-top: 0 !important;
            margin-bottom: 0 !important;
            opacity: 0 !important;
        }

    NOTE! On first render from server, the reveal animation won't trigger.

    You need to add your animation to a React.addons.TransitionGroup

        <ReactTransitionGroup component="div" className="notifications__messages">
            {messages}
        </ReactTransitionGroup>

    Where messages is a list of components that should animate in and out.

*/
var CollapseHeightAnimationMixin = {
    componentWillEnter: function (callback) {
        // Component is mounted, 
        var $el = $(this.getDOMNode());
        // 1 Store height
        var height = $el.outerHeight();
        
        // 2 Set class "notifications__message--collapsed" which sets height to 0
        $el.addClass(this.animationClassName + "--collapsed");

        // Read to trigger DOM reflow, otherwise the height won't animate
        $el.outerHeight();
        
        // 3 Set class "notifications__message--animating"
        $el.addClass(this.animationClassName + "--animating");
        

        $el.on( 'transitionend', function() {
            // Some cleanup to leave the DOM in a clean state
            $el.removeClass(this.animationClassName + "--animating");
            $el.css('height', '');
            $el.off( 'transitionend');
            callback();
        }.bind(this));
        
        // 4 set height and remove collapsed to trigger animation
        $el.css('height', height);

        $el.removeClass(this.animationClassName + "--collapsed");
    },
    
    componentDidEnter: function () {
        // We have already performed all the cleanup
    },
    
    componentWillLeave: function (callback) {
        var $el = $(this.getDOMNode());
        // 7 Set height on style attr
        $el.css('height', $el.outerHeight());
        // 8 Set class "notifications__message--animating"
        $el.addClass(this.animationClassName + "--animating");
        
        // Use setTimeout to trigger DOM reflow, otherwise the height won't animate
        setTimeout(function () {
            $el.on( 'transitionend', function() {
                $el.off( 'transitionend');
                callback();
            });

            // 9 Remove height from style attr
            $el.css('height', '');
            // 10 Set class "notifications__message--collapsed"
            $el.addClass(this.animationClassName + "--collapsed");
            
        }.bind(this));
    },
    
    componentDidLeave: function () {
        // We don't need any cleanup of the animation stuff because the element is destroyed
    }
}

module.exports.CollapseHeightMixin = CollapseHeightAnimationMixin;

/*

*/
var CrossfadeAnimationMixin = {
    componentWillEnter: function (callback) {
        // Component is mounted, 
        var $el = $(this.getDOMNode());
        // 1 Store height
        var height = $el.outerHeight();
        
        var targetHeight = $el.outerHeight(true);
        
        // Set parent target height 
        $el.parent().attr('data-target-height', targetHeight);
        
        // 2 Set class "notifications__message--collapsed" which sets height to 0
        $el.addClass(this.animationClassName + "--collapsed");

        // Read to trigger DOM reflow, otherwise the height won't animate
        $el.outerHeight();
        
        // 3 Set class "notifications__message--animating"
        $el.addClass(this.animationClassName + "--animating");
        

        $el.on( 'transitionend', function() {
            // Some cleanup to leave the DOM in a clean state
            $el.removeClass(this.animationClassName + "--animating");

            $el.css('height', '');
            $el.off( 'transitionend');
            callback();
        }.bind(this));
        
        // 4 set height and remove collapsed to trigger animation
        $el.css('height', height);

        $el.removeClass(this.animationClassName + "--collapsed");
    },
    
    componentDidEnter: function () {
        // We have already performed all the cleanup
    },
    
    componentWillLeave: function (callback) {
        var $el = $(this.getDOMNode());
        // 7 Set height on style attr
        var height = $el.outerHeight();
        var sourceHeight = $el.outerHeight(true);
        $el.css('height', height);
        
        var $parentEl = $el.parent();
        var targetHeight = $parentEl.attr('data-target-height');
        
        $parentEl.css('height', sourceHeight);

        // 8 Set class "notifications__message--animating"
        $el.addClass(this.animationClassName + "--animating");
        
        // Use setTimeout to trigger DOM reflow, otherwise the height won't animate
        setTimeout(function () {
            $el.on( 'transitionend', function() {
                $el.off( 'transitionend');
                callback();
            });

            // 9 Remove height from style attr
            $el.css('height', '');
            
            // Change height of parent element to target
            $parentEl.on( 'transitionend', function() {
                $parentEl.off( 'transitionend');
                $parentEl.css('height', '');
                $parentEl.attr('data-target-height', '');
            });
            $parentEl.css('height', targetHeight);
            
            // 10 Set class "notifications__message--collapsed"
            $el.addClass(this.animationClassName + "--collapsed");
            
        }.bind(this));
    },
    
    componentDidLeave: function () {
        // We don't need any cleanup of the animation stuff because the element is destroyed
    }
}

module.exports.CrossfadeMixin = CrossfadeAnimationMixin;