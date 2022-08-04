export default function WithoutSidebar(Component) {
  return (props) => (
    <>
      <Component {...props} />
    </>
  );
}
