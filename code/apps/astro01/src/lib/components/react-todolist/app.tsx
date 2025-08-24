import List from './list'
import './style.css'

export default function App() {
  return (
    <div className="min-w-xl">
      <List />
      <footer className="info">
        <p>
          Created by <a href="http://twitter.com/oscargodson">Bibby</a>
        </p>
        <p>
          Reference to <a href="http://todomvc.com">TodoMVC</a>
        </p>
      </footer>
    </div>
  )
}
