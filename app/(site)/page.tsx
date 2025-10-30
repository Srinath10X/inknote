import { Button } from "@/components/ui/button";

import Header from "./_components/Header";
import BlueNPurpleGradient from "./_gradients/BlueNPurpleGradient";

export default function Home() {
  return (
    <>
      <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-0 lg:max-w-240 xl:max-w-304">
        <Header />
        <BlueNPurpleGradient />

        <section className="mx-auto max-w-4xl px-4 sm:px-6 md:px-8 py-28 text-center">
          <h1 className="mx-auto max-w-2xl text-balance text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl z-10">
            Your thoughts deserve a calm workspace
          </h1>

          <p className="mt-6 mx-auto max-w-[50ch] text-xl text-black/60 sm:text-2xl z-10">
            For people who want less clutter and create without noise.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-2">
            <Button className="h-12 w-full sm:w-auto px-8 text-base font-medium  z-10">
              Get started
            </Button>

            <Button
              variant="outline"
              className="h-12 w-full sm:w-auto px-8 text-base font-medium border border-black/15 z-10"
            >
              Learn more
            </Button>
          </div>
        </section>

        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil ratione
          rem consequatur placeat repudiandae consectetur voluptas iste
          reiciendis blanditiis. Temporibus amet alias magni commodi ab ut dicta
          facere harum nihil repudiandae rerum, voluptatum perferendis rem
          voluptate suscipit illo porro nulla sed nobis recusandae velit ducimus
          quod! Expedita, vero? Deleniti quas provident iusto reiciendis, magni
          eum sit esse quaerat dolor quae dignissimos quis laboriosam
          consectetur excepturi maiores, enim dolores dolore eaque alias
          architecto voluptatum? Quam labore aspernatur officiis quas voluptates
          qui, laudantium rerum. Ea nihil ipsum debitis excepturi omnis,
          provident neque corporis eius dolore cumque assumenda rem dolores
          reprehenderit voluptates sit sed perferendis blanditiis praesentium
          veniam quod. Placeat, voluptas quaerat? Eum dolore aut excepturi, vero
          aliquam, adipisci iusto quod quisquam corporis hic similique earum,
          dolores deleniti. Officiis iusto animi sequi, neque autem libero nobis
          nemo numquam. Magnam, error? Aliquid accusamus repellat enim iure
          nulla voluptatum hic animi corporis doloribus quis optio officiis
          consequatur quasi eveniet sapiente impedit facilis quae, adipisci
          harum nostrum sed. Laboriosam sit sed aut odit corporis, aliquid
          facere fugit tempora aspernatur adipisci sunt ab molestiae, est
          repellendus sequi, optio quisquam! Nostrum ullam quam quo perspiciatis
          voluptates ratione quibusdam saepe repellat aliquam adipisci cum,
          beatae non, eligendi tempora sapiente voluptatum eaque repudiandae
          fugiat itaque molestias rem voluptas fuga deserunt? Saepe corrupti
          libero placeat aut totam eveniet provident officiis aspernatur enim,
          quos nobis ipsa earum ad deserunt ipsam, eligendi nihil voluptatum
          quae. Ex quisquam natus, nam aut excepturi itaque harum, atque
          reiciendis iure aperiam distinctio deleniti placeat, pariatur illum
          dolore hic! Perferendis est consectetur laboriosam tenetur excepturi
          natus ad aliquam sit, assumenda dolores accusamus ex sint, iste optio
          beatae modi animi, quas cumque ipsa. Placeat blanditiis ab eos ipsam
          fugit provident dolore omnis temporibus, laboriosam recusandae error
          velit dolor consequuntur, dicta, commodi et suscipit harum dolores
          reiciendis distinctio magni quibusdam delectus quaerat aliquid! Quas
          labore illo reiciendis voluptatibus, odit officiis id laborum animi
          doloremque quod maiores ad cum obcaecati asperiores reprehenderit
          iusto voluptates delectus necessitatibus quaerat esse est quo ea dolor
          natus. Ex soluta officiis, nulla, velit quisquam magnam laboriosam
          cupiditate hic perferendis fuga id harum quasi repudiandae laudantium
          tempore, veritatis necessitatibus itaque delectus atque nemo adipisci
          reiciendis neque eum. Doloribus impedit nulla omnis similique.
          Similique beatae maiores odio provident cumque, aspernatur repudiandae
          dicta omnis iusto quo assumenda earum labore? Omnis molestiae quos sed
          eum ducimus eius tenetur iste, amet ad libero iure sint adipisci.
          Delectus ducimus dolores cupiditate beatae?
        </div>
      </div>
    </>
  );
}
