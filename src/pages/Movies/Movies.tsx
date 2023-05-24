import { Obj } from "../../types";

function Movies(props: { user: Obj }) {
  return (
    <div>
      <h1 className="text-white">{props.user.name}</h1>
    </div>
  );
}
export default Movies;
