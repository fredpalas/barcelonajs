import { component$ } from "@builder.io/qwik";
import { type DocumentHead, Form, routeAction$, routeLoader$, z, zod$ } from "@builder.io/qwik-city";
import Title from "~/components/title/title";
import { v4 as uuid } from "uuid";
import Card from "~/components/card/card";

interface ListItem {
  id: string;
  title: string;
  description: string;
  type: string;
  createdAt: string;
}

export const list: ListItem[] = [];

export const useAddToListAction = routeAction$(
  async (item) => {
    const newItem = {
      id: uuid(),
      title: item.title,
      description: item.description,
      type: item.type
    };
    const response = await fetch(`${import.meta.env.PUBLIC_API_URL}/lists`, {
      method: "PUT",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify(newItem)
    });

    return {
      success: response.ok
    };
  },
  zod$({
    title: z.string().trim().min(1),
    description: z.string().trim().min(1),
    type: z.string().trim().min(1)
  })
);

export const useDeleteAction = routeAction$(async (item) => {
  const response = await fetch(`${import.meta.env.PUBLIC_API_URL}/lists/${item.id}`, {
    headers: { Accept: "application/json" },
    method: "DELETE"
  });

  return {
    success: response.ok
  };
});

export const useListLoader = routeLoader$(async () => {
  const url = `${import.meta.env.PUBLIC_API_URL}/lists/`;
  const response = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/json", "Content-Type": "application/json" }
  });


  return await response.json() as ListItem[];
});

export default component$(() => {
  const list = useListLoader();
  const action = useAddToListAction();
  const deleteList = useDeleteAction();
  return (
    <>
      <div class="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
        <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Todo Lists</h2>
        <p class="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
          Create your own todo list
        </p>
      </div>
      <div class="grid gap-8 mb-6 lg:mb-16 md:grid-cols-3">
        {list.value.map((item, index) => (
          <Card id={item.id} key={`items-${index}`} onClick$={async () => {
            const { value } = await deleteList.submit({ id: item.id });
            console.log(value);
          }}>
            <Title q:slot="icon" type={item.type}>
            </Title>
            <h4 q:slot="title" class="mb-1 text-xl font-medium text-white">
              {item.title}
            </h4>
            <p q:slot="description">{item.description}</p>
            <p style="margin: auto" q:slot="createdAt">
              {item.createdAt}
            </p>
          </Card>
        ))}
      </div>
      <div class="container container-center">
        <Form action={action} spaReset>
          <div class="mb-6">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="title">Title</label>
            <input type="text" id="title"
                    name="title"
                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                   required />
          </div>
          <div class="mb-6">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="description">Text</label>
            <textarea id="text" rows={4} name="description"
                      class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Leave a comment..."></textarea>
          </div>
          <div class="mb-6">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="type">Type</label>
            <select id="type"
                    name="type"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option>NOTE</option>
              <option>NOTIFICATION</option>
              <option>REMINDER</option>
              <option>TASK</option>
              <option>DELAYED_TASK</option>
            </select>
          </div>
          <button type="submit" class="button-dark">
            Add item
          </button>
        </Form>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Qwik Todo List"
};
