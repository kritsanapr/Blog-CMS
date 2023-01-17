import React from "react";

export default function Post() {
  return (
    <div className="post">
      <div className="image">
        <img
          src="https://techcrunch.com/wp-content/uploads/2023/01/52625345016_2165b2c4fe_c.jpg?w=850&h=492&crop=1"
          alt=""
        ></img>
      </div>
      <div className="texts">
        <h2>A peek into the future as Sam Altman sees it</h2>
        <p className="info">
          <a herf="/" className="author">
            Dawid Padzko
          </a>
          <time>2023-01-06 16:45</time>
        </p>
        <p className="summary">
          Late last week, in a rare sit-down before a small audience, this
          editor spent an hour with Sam Altman, the former president of Y
          Combinator and, since 2019, the CEO of OpenAI, the company he famously
          co-founded with Elon Musk and numerous others in 2015 to develop
          artificial intelligence for the “benefit of humanity.”
        </p>
      </div>
    </div>
  );
}
