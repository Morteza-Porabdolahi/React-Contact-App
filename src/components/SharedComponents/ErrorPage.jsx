import { useRouteError } from "react-router-dom"

export const myError = (message = "", status = 0) => {
  return new Response(message, { status });
}

export const ErrorPage = () => {
  const error = useRouteError();
  console.error(error)

  return (
    <div style={{ color: 'white', textAlign: 'center', direction: 'ltr', padding: '12rem 0' }} id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message || error.data}</i>
      </p>
    </div>
  )
}
