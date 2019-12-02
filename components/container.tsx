const Container = ({ children }) => (
  <>
    <div>{children}</div>
    <style jsx>{`
      div {
        max-width: 45rem;
        margin: 0 auto;
        padding: 0 1em;
      }
    `}</style>
  </>
);

export default Container;
