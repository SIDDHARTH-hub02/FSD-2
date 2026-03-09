import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, setCount } from "../store/counterSlice";

export default function CounterReduxParent({ cno }) {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="box">
      <h3 className="box-title">{cno} : Global State (Redux) Count: {count}</h3>
      <div className="box-controls">
        <button className="box-btn" onClick={() => dispatch(increment())}>Increase</button>
        <button className="box-btn" onClick={() => dispatch(decrement())}>Decrease</button>
        <button className="box-btn" onClick={() => dispatch(setCount(0))}>Reset</button>
      </div>
    </div>
  );
}
