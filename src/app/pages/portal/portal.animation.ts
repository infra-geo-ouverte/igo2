import './portal.variables.scss';

import {
  trigger,
  state,
  style,
  transition,
  animate,
  AnimationTriggerMetadata
} from '@angular/animations';

export function expansionPanelAnimation(): AnimationTriggerMetadata[] {
  return [
    trigger('expansionPanelSize', [
      state(
        'full',
        style({
          left: '5px',
          'max-width': '100%'
        })
      ),
      state(
        'notTriggered',
        style({
          left: '5px',
          bottom: '5px',
          'max-width': '100%'
        })
      ),
      state(
        'notVisible',
        style({
          display: 'none'
        })
      ),
      state(
        'mobile',
        style({
          left: 'calc(100% - 40px)',
        })
      ),
      state(
        'reduced',
        style({
          left: '405px',
          'max-width': 'calc(100% - 405px)'
        })
      ),
      state(
        'reducedNotTriggered',
        style({
          left: '405px',
          bottom: '5px',
          'max-width': 'calc(100% - 405px)'
        })
      ),
      transition('* => *', animate('100ms'))
    ]),
    trigger('toastOffsetY', [
      state(
        'true',
        style({
          bottom: '50px'
        })
      ),
      state(
        'false',
        style({
          bottom: '5px'
        })
      )
    ])
  ];
}

export function toastPanelAnimation(): AnimationTriggerMetadata[] {
  return [
    trigger('toastPanelMobileSidenav', [
      state(
        'true',
        style({
          display: 'none'
        })
      ),
      transition('* => void', animate('0ms')),
      transition('* => *', animate('200ms'))
    ]),
    trigger('toastPanelOffsetX', [
      state(
        'fullStandard',
        style({
          left: '45%'
        })
      ),
      state(
        'standard',
        style({
          left: '50%'
        })
      ),
      state(
        'htmlDisplay',
        style({
          left: '40%'
        })
      ),
      state(
        'fullOffsetX',
        style({
          left: 'calc(45% + 202px)'
        })
      ),
      state(
        'standardOffsetX',
        style({
          left: 'calc(50% + 202px)'
        })
      ),
      state(
        'htmlDisplayOffsetX',
        style({
          left: 'calc(40% + 160px)'
        })
    ),
      transition('fullStandard => fullOffsetX', animate('200ms')),
      transition('fullOffsetX => fullStandard', animate('200ms')),
      transition('standard => standardOffsetX', animate('200ms')),
      transition('standardOffsetX => standard', animate('200ms')),
      transition('htmlDisplay => htmlDisplayOffsetX', animate('200ms')),
      transition('htmlDisplayOffsetX => htmlDisplay', animate('200ms')),
      // transition('standard => htmlDisplay', animate('200ms')),
      // transition('htmlDisplay => standard', animate('200ms')),
    ]),
    trigger('toastPanelOffsetY', [
      state(
        'noExpansion',
        style({
          bottom: '0'
        })
      ),
      state(
        'expansionAndToastOpened',
        style({
          bottom: '285px',
          zIndex: '999'
        })
      ),
      state(
        'expansionAndToastClosed',
        style({
          bottom: '285px',
          zIndex: '5'
        })
      ),
      state(
        'expansionMaximizedAndToastOpened',
        style({
          bottom: '500px', // workspace full size
          zIndex: '999'
        })
      ),
      state(
        'expansionMaximizedAndToastClosed',
        style({
          bottom: '500px', // workspace full size
          zIndex: '5'
        })
      ),
    transition('noExpansion => noExpansion', animate('10ms')),
    transition('expansionAndToastOpened => expansionAndToastOpened', animate('200ms')),
    transition('expansionAndToastClosed => expansionAndToastClosed', animate('200ms')),
    transition('expansionMaximizedAndToastOpened => expansionMaximizedAndToastOpened', animate('200ms')),
    transition('expansionMaximizedAndToastClosed => expansionMaximizedAndToastClosed', animate('200ms')),
       ])
  ];
}

export function controlsAnimations(): AnimationTriggerMetadata[] {
  return [
    trigger('controlsOffsetY', [
      state('close', style({})),
      state(
        'firstRowFromBottom',
        style({
          bottom: '5px'
        })
      ),
      state(
        'firstRowFromBottom-expanded',
        style({
          bottom: '5px'
        })
      ),
      state(
        'firstRowFromBottom-expanded-maximized',
        style({
          bottom: '500px'
        })
      ),
      state(
        'secondRowFromBottom',
        style({
          bottom: '47px'
        })
      ),
      state(
        'thirdRowFromBottom',
        style({
          bottom: '104px'
        })
      ),
      state(
        '',
        style({
          bottom: 'calc(285px)'
        })
      ),
      state(
        'secondRowFromBottom-expanded',
        style({
          bottom: 'calc(285px + 52px)'
        })
      ),
      state(
        'thirdRowFromBottom-expanded',
        style({
          bottom: 'calc(285px + 104px)'
        })
      ),
      transition('* => *', animate('200ms'))
    ]),
    trigger('mobileOffsetY', [
      state(
        'low',
        style({
          bottom: '50px'
        })
      ),
      transition('* => *', animate('200ms'))
    ])
  ];
}

export function controlSlideX(): AnimationTriggerMetadata {
  return trigger('controlStateX', [
    state(
      'left',
      style({
        left: '60px'
      })
    ),
    state(
      'right',
      style({
        left: '465px'
      })
    ),
    transition('* => *', animate('200ms'))
  ]);
}

export function controlSlideY(): AnimationTriggerMetadata {
  return trigger('controlStateY', [
    state('close', style({})),
    state(
      'firstRowFromBottom',
      style({
        bottom: '2px',
        'margin-left': '0px'
      })
    ),
    state(
      'firstRowFromBottom-expanded',
      style({
        bottom: '285px',
        'margin-left': '-55px'
      })
    ),
    state(
      'firstRowFromBottom-expanded-maximized',
      style({
        bottom: '500px', // workspace full size
        'margin-left': '-55px'
      })
    ),
    transition('* => *', animate('200ms'))
  ]);
}

export function mapSlideX(): AnimationTriggerMetadata {
  return trigger('mapStateX', [
    state(
      'left',
      style({
        left: '0'
      })
    ),
    state(
      'right',
      style({
        left: '0'
      })
    ),
    transition('* => *', animate('200ms'))
  ]);
}
export function mapSlideY(): AnimationTriggerMetadata {
  return trigger('mapStateY', [
    state(
      '*',
      style({
        bottom: '0'
      })
    ),
    transition('* => *', animate('200ms'))
  ]);
}
