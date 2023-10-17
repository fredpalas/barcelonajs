import { Slot, component$, PropFunction } from "@builder.io/qwik";

export default component$((props:  {
  id: string;
  onClick$?: PropFunction<() => void>;
}) => {

  return (

    <div class="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
      <div class="w-full rounded-lg sm:rounded-none sm:rounded-l-lg ml-2">
        <Slot name={"icon"} />
      </div>
      <div class="p-5">
        <Slot name={"title"} />
        <div class="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">
          <Slot name={"description"} />
        </div>
        <div class="flex space-x-4 sm:mt-0">
          <Slot name={"createdAt"} />
          <div class="p-2">
            <button id={`dropdownMenuIconButton${props.id}`} data-dropdown-toggle={`dropdownDots${props.id}`} class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button">
              <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
                <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
              </svg>
            </button>
            <div id={`dropdownDots${props.id}`} class="hidden z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
              <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby={`dropdownMenuIconButton${props.id}`}>
                <li>
                  <a onClick$={props.onClick$} href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
);
});