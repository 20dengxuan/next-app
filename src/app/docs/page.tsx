import React from "react";
import Image from "next/image";
const User: React.FC<{ params: {}; searchParams: { page?: number } }> = async ({
  searchParams,
}) => {
  const { page = 1 } = searchParams;

  const res = await fetch("http://st.3-e.cn/web/project/index", {
    method: "GET",
  });

  const { data = [] } = await res.json();
  console.log(data);
  return (
    <main className="max-w-[1280px] m-auto p-4">
      <div>
        <p className="font-semibold text-[50px]">Blog.</p>
        <div className="block">
          <Image
            layout="responsive"
            width={0}
            height={0}
            alt=""
            src={
              "https://assets-us-01.kc-usercontent.com:443/a99c6ff3-1e1d-000a-2573-c93dfb21cf6e/d2370b26-fe0d-4c99-9a06-cd79df7a3c3a/cover.jpg"
            }
          />
        </div>
      </div>
      <p className="font-semibold text-[50px]  mt-16">list.</p>
      <div className="grid md:grid-cols-2 gap-6 grid-cols-1">
        {data.map((item: any, index: number) => (
          <a
            href={"/docs/detail?id=" + item.id}
            key={index}
            className={`flex flex-col gap-4`}
          >
            <div className="flex-none w-full block ">
              <Image
                layout="responsive"
                width={0}
                height={0}
                alt=""
                src={
                  "https://assets-us-01.kc-usercontent.com:443/a99c6ff3-1e1d-000a-2573-c93dfb21cf6e/5900325b-5bee-44dc-828f-988078a63472/cover.jpg"
                }
                className="shadow-sm hover:shadow-md transition-shadow duration-200"
              />
            </div>

            <div className="flex-1 flex flex-col gap-2">
              <p className="font-semibold text-[24px]">{item.name}</p>
              <p className="text-[20px]">2023-12-11 12:30</p>
              <div className="flex items-center gap-4">
                <div className="relative h-[50px] w-[50px] rounded-full">
                  <Image
                    fill
                    alt=""
                    src={
                      "https://assets-us-01.kc-usercontent.com:443/a99c6ff3-1e1d-000a-2573-c93dfb21cf6e/5900325b-5bee-44dc-828f-988078a63472/cover.jpg"
                    }
                    className="rounded-full"
                  />
                </div>
                <span> D.mr </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </main>
  );
};

export default User;
