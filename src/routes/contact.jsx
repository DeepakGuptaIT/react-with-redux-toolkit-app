import { Form, useNavigate, useParams, useLoaderData, useFetcher, } from "react-router-dom";
import { getContact } from "../contacts";

export async function loader({ params }) {
    return getContact(params.contactId);
}

export default function Contact() {
    // Get the contactId param from the URL.
    let { contactId } = useParams();
    console.log(contactId);
    let contact = useLoaderData();
    const navigate = useNavigate();
    if (!contact) {

        // contact = {
        //     first: "Your",
        //     last: "Name",
        //     avatar: "https://placekitten.com/g/200/200",
        //     twitter: "your_handle",
        //     notes: "Some notes",
        //     favorite: true,
        // };
        throw new Response("", {
            status: 404,
            statusText: "Not Found",
        });
    }

    return (
        <div id="contact">
            <div>
                <img
                    key={contact.avatar}
                    src={contact.avatar || null}
                />
            </div>

            <div>
                <h1>
                    {contact.first || contact.last ? (
                        <>
                            {contact.first} {contact.last}
                        </>
                    ) : (
                        <i>No Name</i>
                    )}{" "}
                    <Favorite contact={contact} />
                </h1>

                {contact.twitter && (
                    <p>
                        <a
                            target="_blank"
                            href={`https://twitter.com/${contact.twitter}`}
                        >
                            {contact.twitter}
                        </a>
                    </p>
                )}

                {contact.notes && <p>{contact.notes}</p>}

                <div>
                    <Form action="edit">
                        <button type="submit">Edit</button>
                    </Form>
                    <Form
                        method="post"
                        action="destroy"
                        onSubmit={(event) => {
                            if (
                                !window.confirm(
                                    "Please confirm you want to delete this record."
                                )
                            ) {
                                event.preventDefault();
                            }
                        }}
                    >
                        <button type="submit">Delete</button>
                    </Form>
                    <form>
                        <button
                            type="button"
                            onClick={() => {
                                navigate(-1);
                            }}
                        >
                            Go back
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

function Favorite({ contact }) {
    // yes, this is a `let` for later
    let favorite = contact.favorite;
    const fetcher = useFetcher();
    return (
        <fetcher.Form method="post">
            <Form method="post">
                <button
                    name="favorite"
                    value={favorite ? "false" : "true"}
                    aria-label={
                        favorite
                            ? "Remove from favorites"
                            : "Add to favorites"
                    }
                >
                    {favorite ? "★" : "☆"}
                </button>
            </Form>
        </fetcher.Form>
    );
}