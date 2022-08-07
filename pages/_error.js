export default function Error({ statusCode }) {
  return (
    <div>
      {statusCode
        ? `An error has ocurred on the server ${statusCode}`
        : "Error on the client side"}
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return statusCode;
};
