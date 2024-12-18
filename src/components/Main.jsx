import { useState, useEffect } from "react";
import { posts, filterItems } from "../posts";
import Card from "../Card";
import AddPost from "./AddPost";

const newPost = {
    title: "",
    image: "",
    content: "",
    categoria: "",
    tags: [],
    published: true,
}

function Main() {
    const [blog, setBlog] = useState(posts);
    const [formData, setFormData] = useState(newPost);
    const [search, setSearch] = useState("");
    const [filteredList, setFilteredList] = useState(posts);
    useEffect(() => {
        const filtered = blog.filter((post) =>
            (post.title || "").toLowerCase().includes(search.toLowerCase())
        );
        setFilteredList(filtered);
    }, [search, blog]);

    function deletePost(id) {
        setBlog(blog.filter((el) => el.id !== id));
    }

    function handleInput(e) {
        const value =
            e.target.type === "checkbox" ? e.target.checked : e.target.value;

        setFormData({ ...formData, [e.target.name]: value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        setBlog([...blog, { id: self.crypto.randomUUID(), ...formData }]);
        setFormData(newPost);
    }

    function handleTags(e) {
        setFormData((formData) => {
            let { tags, ...others } = formData;
            if (tags.includes(e.target.value)) {
                tags = tags.filter((val) => val !== e.target.value);
            }
            else {
                tags = [...tags, e.target.value]
            }
            return {
                tags, ...others
            }
        });
    }

    function handleSearch(e) {
        setSearch(e.target.value);
    }

    return (
        <>
            <main className="main-container">
                <div className="col-12">
                    <label htmlFor="search" className="form-label">Cerca</label>
                    <input type="search" name="search" id="search" value={search} className="form-control" onChange={handleSearch} />
                </div>
                {filteredList.map(post => (
                    <div className="card-container" key={post.id}>
                        <Card
                            title={post.name}
                            image={post.image}
                            tags={post.tags}
                            content={post.content}
                            categoria={post.categoria}
                            published={post.published}
                            onDelete={() => deletePost(post.id)}
                        />
                    </div>
                ))}
                <AddPost handleInput={handleInput} handleSubmit={handleSubmit} formData={formData} handleTags={handleTags} />
            </main>
        </>
    );
}

export default Main;
