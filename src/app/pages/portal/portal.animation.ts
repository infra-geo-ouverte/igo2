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
      transition('* => *', animate('200ms')),
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
      transition('fullStandard => fullOffsetX', animate('200ms')),
      transition('fullOffsetX => fullStandard', animate('200ms')),
      transition('standard => standardOffsetX', animate('200ms')),
      transition('standardOffsetX => standard', animate('200ms')),
    ]),
    trigger('toastPanelOffsetY', [
      state(
        'false',
        style({
          bottom: '0'
        })
      ),
      state(
        'true',
        style({
          bottom: '285px',
          zIndex: '1'
        })
      ),
      transition('* => *', animate('200ms'))
    ])
  ];
}

export function baselayersAnimation(): AnimationTriggerMetadata[] {
  return [
    trigger('baselayersStateY', [
      state('close', style({})),
      state(
        'up',
        style({
          bottom: '285px'
        })
      ),
      transition('* => *', animate('200ms'))
    ]),
    trigger('baselayersWithToastPanel', [
      state(
        'up',
        style({
          bottom: '92px'
        })
      ),
      state(
        'down',
        style({
          bottom: '47px'
        })
      )
    ])
  ];
}

export function controlsAnimations(): AnimationTriggerMetadata[] {
  return [
    trigger('controlsOffsetX', [
      state(
        'false',
        style({
          right: '5px'
        })
      ),
      state(
        'true',
        style({
          left: 'calc(100% - 40px)'
        })
      ),
      transition('* => *', animate('200ms'))
    ]),
    trigger('controlsOffsetY', [
      state('close', style({})),
      state(
        'false',
        style({
          bottom: '5px'
        })
      ),
      state(
        'true',
        style({
          bottom: '285px'
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
      'down',
      style({
        bottom: '2px',
        'margin-left': '0px'
      })
    ),
    state(
      'up',
      style({
        bottom: '285px',
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
      'close',
      style({
        bottom: '0'
      })
    ),
    state(
      'down',
      style({
        bottom: '0'
      })
    ),
    state(
      'up',
      style({
        bottom: '0'
      })
    ),
    transition('* => *', animate('200ms'))
  ]);
}
