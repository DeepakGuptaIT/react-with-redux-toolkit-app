import { Outlet, useLoaderData, Form, NavLink, useNavigation, redirect, useSubmit, } from "react-router-dom";
import { getContacts, createContact } from "../contacts";
import { useEffect } from "react";



export async function action() {
    const contact = await createContact();
    // return { contact };
    return redirect(`/contacts/${contact.id}/edit`);
}


export async function loader({ request }) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    const contacts = await getContacts(q);
    return { contacts, q };
}

export default function Root() {
    const { contacts, q } = useLoaderData();
    const navigation = useNavigation();
    console.log(navigation.state, navigation.location);
    useEffect(() => {
        document.getElementById("q").value = q;
    }, [q]);
    const submit = useSubmit();
    const searching =
        navigation.location &&
        new URLSearchParams(navigation.location.search).has(
            "q"
        );

    const routerList = [
        {
            path: "/",
            name: "Counter Demo"
        },
        {
            path: "/todos",
            name: "Todo List"
        }
    ]
    return (
        <>
            <div id="sidebar">
                <h1>React Router Contacts</h1>
                <div>
                    <Form id="search-form" role="search">
                        <input
                            id="q"
                            className={searching ? "loading" : ""}
                            aria-label="Search contacts"
                            placeholder="Search"
                            type="search"
                            name="q"
                            defaultValue={q}
                            onChange={(event) => {
                                // submit(event.currentTarget.form);
                                const isFirstSearch = q == null;
                                submit(event.currentTarget.form, {
                                    replace: !isFirstSearch,
                                });
                            }}
                        />
                        <div
                            id="search-spinner"
                            aria-hidden
                            hidden={!searching}
                        />
                        <div
                            className="sr-only"
                            aria-live="polite"
                        ></div>
                    </Form>
                    <Form method="post">
                        <button type="submit">New</button>
                    </Form>
                </div>
                <nav>
                    <ul>
                        {routerList.map((item) => (
                            <li key={item.path}>
                                <NavLink
                                    to={item.path}
                                    className={({ isActive, isPending }) =>
                                        isActive
                                            ? "active"
                                            : isPending
                                                ? "pending"
                                                : ""
                                    }
                                >{item.name}
                                </NavLink>
                            </li>
                        ))
                        }

                        {contacts.length ? (
                            <>
                                {contacts.map((contact) => (
                                    <li key={contact.id}>
                                        <NavLink
                                            to={`contacts/${contact.id}`}
                                            className={({ isActive, isPending }) =>
                                                isActive
                                                    ? "active"
                                                    : isPending
                                                        ? "pending"
                                                        : ""
                                            }
                                        >
                                            {contact.first || contact.last ? (
                                                <>
                                                    {contact.first} {contact.last}
                                                </>
                                            ) : (
                                                <i>No Name</i>
                                            )}{" "}
                                            {contact.favorite && <span>★</span>}
                                        </NavLink>
                                    </li>
                                ))}
                            </>
                        ) : (
                            <p>
                                <i>No contacts</i>
                            </p>
                        )}
                    </ul>
                </nav>
            </div>
            <div id="detail" className={
                navigation.state === "loading" ? "loading" : ""
            }>
                <Outlet />
            </div>
        </>
    );
}