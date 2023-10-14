import { Slot, component$ } from "@builder.io/qwik";

export default component$((props:  {type: string}) => {

  const type = props.type;
  let style = '';
  if (type === 'NOTE') {
    style = 'icon icon-note';
  } else if (type === 'ALARM') {
    style = 'icon icon-alarm';
  } else if (type === 'NOTIFICATION') {
    style = 'icon icon-notification';
  } else if (type === 'REMINDER') {
    style = 'icon icon-reminder';
  } else if (type === 'TASK') {
    style = 'icon icon-task';
  } else if (type === 'DELAYED_TASK') {
    style = 'icon icon-task';
  }

  return (
    <div class={style}>
      <Slot/>
    </div>
  );
});
