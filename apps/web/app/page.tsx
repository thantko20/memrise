import { client } from './ts-rest';

export default async function Home() {
  const hello = await client.hello.sayHello.query();

  return hello.status === 200 ? <p>{hello.body.message}</p> : null;
}
