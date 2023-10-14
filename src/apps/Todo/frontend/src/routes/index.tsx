import { component$ } from "@builder.io/qwik";
import {
  type DocumentHead,
  routeLoader$,
  routeAction$,
  zod$,
  z,
  Form,
} from "@builder.io/qwik-city";
import styles from "./todolist.module.css";
import stylesFoot from "~/components/starter/footer/footer.module.css";
import Infobox from "~/components/starter/infobox/infobox";
import Title from "~/components/title/title";
import { v4 as uuid } from 'uuid';

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
    }
    const response = await fetch(`${import.meta.env.PUBLIC_API_URL}lists`, {
      method: 'PUT',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    });

    return {
      success: response.ok,
    };
  },
  zod$({
    title: z.string().trim().min(1),
    description: z.string().trim().min(1),
    type: z.string().trim().min(1),
  }),
);

export const useDeleteAction = routeAction$(async (item) => {
  const response = await fetch(`${import.meta.env.PUBLIC_API_URL}lists/${item.id}`, {
    headers: { Accept: 'application/json' },
    method: 'DELETE',
  });

  return {
    success: response.ok,
  }
});

export const useListLoader = routeLoader$(async () => {
  const response = await fetch(`${import.meta.env.PUBLIC_API_URL}/lists/`, {
    headers: { Accept: 'application/json' },
  });
  return (await response.json()) as ListItem[];
});

export default component$(() => {
  const list = useListLoader();
  const action = useAddToListAction();
  const deleteList = useDeleteAction();
  return (
    <>
      <div class="container container-center">
        <h1>
          <span class="highlight">TODO</span> List
        </h1>
      </div>

      <div role="presentation" class="ellipsis"></div>

      <div class="container container-center">
        {list.value.length === 0 ? (
          <span class={styles.empty}>No items found</span>
        ) : (
          <ul class={styles.list}>
            {list.value.map((item, index) => (
              <li key={`items-${index}`}>
                <Infobox>
                  <Title type={item.type}>
                    {item.title}
                  </Title>
                  <>
                    <p>
                      {item.description}
                    </p>
                  </>
                  <div class="container">
                    <span>created: </span>
                    <small>{item.createdAt}</small>
                    <span class={stylesFoot.spacer}>|</span>
                    <span>
                      <button class="button-dark" onClick$={async () => {
                        const { value } = await deleteList.submit({ id: item.id });
                        console.log(value);
                      }}
                      >
                        Delete
                      </button>
                    </span>
                  </div>
                </Infobox>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div class="container container-center">
        <Form action={action} spaReset>
          <input type="text" name="title" required class={styles.input} />{" "}
          <input type="text" name="description" required class={styles.input} />{" "}
          <input type="text" name="type" class={styles.input} value="NOTE" />
          <button type="submit" class="button-dark">
            Add item
          </button>
        </Form>

        <p class={styles.hint}>
          PS: This little app works even when JavaScript is disabled.
        </p>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Qwik Todo List",
};
