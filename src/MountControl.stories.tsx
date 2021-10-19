import { useState } from 'react';
import { ComponentStory, Meta } from '@storybook/react';
import MountControlComponent from '.';
import type { MountControlProps } from '.';

export default {
  title: 'Example',
  component: MountControlComponent,
  argTypes: {},
} as Meta<MountControlProps>;

export const MountControl: ComponentStory<typeof MountControlComponent> = (args) => {
  const [mount, setMount] = useState(true);

  return (
    <>
      <button type="button" onClick={() => setMount((prev) => !prev)}>
        Click
      </button>

      <MountControlComponent
        {...args}
        mount={mount}
        timeout={2000}
        onMount={() => console.log('onMount')}
        onUnmount={() => console.log('onUnmount')}
        onTransitionMount={() => console.log('onTransitionMount')}
        onTransitionUnmount={() => console.log('onTransitionUnmount')}
      >
        <p>
          Labore dolor aliqua veniam sunt ut velit sunt magna ipsum adipisicing enim incididunt et
          ex. Occaecat nostrud irure eiusmod veniam consequat qui nisi velit eu id incididunt nulla.
          Incididunt aute enim enim ea non laborum exercitation incididunt duis cupidatat. Magna
          commodo tempor nulla ad anim id veniam cillum amet tempor. Culpa in velit voluptate
          adipisicing velit commodo aliqua laboris proident quis sunt non id aliquip. Cupidatat
          proident eiusmod pariatur velit excepteur eiusmod. Sunt eu id duis exercitation anim
          officia deserunt et officia consequat aute Lorem. Consectetur duis ea esse do sint Lorem
          exercitation. Quis sint veniam non magna commodo voluptate minim exercitation magna sit
          non.
        </p>
      </MountControlComponent>
    </>
  );
};

MountControl.args = {};
