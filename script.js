const app = {

  element : document.body,

  effects : {

    apply : function( effect, delay ) {

      delay = delay || 250;

      const delayLoop = (fn, delay) => {
        return (x, i) => {
          setTimeout(() => {
            fn(x);
          }, i * delay);
        };
      };

      const elements = document.querySelectorAll( '[data-effect="' + effect + '"]' );

      const apply = el => el.dataset.effect = 'done';

      elements.forEach( delayLoop( apply, delay ) );

    },

    initialize : function() {

      app.effects.apply( 'fade', 200 );

      setTimeout( () => {

        app.effects.apply( 'fade-from-bottom', 200 );

      }, 400 );

    }

  },

  load : {

    initialize : function() {

      window.addEventListener( 'load', () => {

        setTimeout( () => {

          app.element.dataset.status = 'loaded'
          app.effects.initialize()

          setTimeout( () => {

            document.querySelector('.loader').classList.add( 'pause' );

          }, 800 )

        }, 800 )

      } );

      setTimeout( () => {

        if ( app.element.status == 'loading' ) {

          app.element.dataset.status = 'loaded'
          app.effects.initialize()

        }

      }, 4000 )

    },

  },

  pages : {

    loadImages : function( page ) {

      let images = document.querySelectorAll( '#' + page + ' img[data-src]' )

      for ( let image of images ) {
        image.src = image.dataset.src
      }

    },

    open : function( page ) {

      app.element.dataset.open = page
      app.pages.loadImages( page )

    },

    close : function() {

      app.element.dataset.open = ''

    },

    initialize : function() {

      let triggers = document.querySelectorAll( '[data-page]' );

      for ( let trigger of triggers ) {

        trigger.addEventListener( 'click', function() {

          let page = this.dataset.page

          app.pages.open( page )

        } )

      }

      let closers = document.querySelectorAll( '[data-close]' );

      for ( let closer of closers ) {

        closer.addEventListener( 'click', function( event ) {

          if ( this === event.target ) {

            app.pages.close()

          }

        } )

      }

    }

  },

  initialize : function() {

    app.load.initialize()
    app.pages.initialize()

  }

}

app.initialize()
