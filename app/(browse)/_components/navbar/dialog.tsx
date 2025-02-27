"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import Image from "next/image";

const DialogHome = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="relative">
      <button className="p-1 mt-1" onClick={() => setDialogOpen(true)}>
        <Image src="/cap.png" width={20} height={20} alt="Trigger modal" />
      </button>
      <Transition show={dialogOpen}>
        <Dialog className="relative z-10" onClose={setDialogOpen}>
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </TransitionChild>

          <div className="fixed inset-0 z-10 left-20 lg:w-screen w-4/5 bottom-52 sm:bottom-16  overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-2 sm:items-center sm:p-0">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full sm:w-[25rem]">
                  <div className="bg-[#212121] px-4 pb-4 pt-5 sm:p-4 sm:pb-4 text-white">
                    <div className="mt-3 sm:ml-4 sm:mt-0 sm:text-left">
                      <DialogTitle
                        as="h3"
                        className="text-base font-semibold leading-6 mt-4 mb-8"
                      >
                        LivePayout Token
                      </DialogTitle>
                      <div className="flex justify-between mt-2 mb-8 w-full gap-2 items-center">
                        <label htmlFor="" className="text-white/70 block mb-2">
                          Coming Soon...
                        </label>
                        <Image
                          src="/cap.png"
                          width={20}
                          height={20}
                          alt="Trigger modal"
                        />
                        {/* <Input
                          value={""}
                          // onChange={(e) => setAddress(e.target.value)}
                          placeholder="Coming"
                          type="text"
                          className="rounded border border-transparent focus:border-gray-400 bg-[#2d2d2d] text-white  mb-4 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                        /> */}
                      </div>
                      <p className="text-white/50 mb-24 text-sm">
                        Coming Soon...
                      </p>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default DialogHome;
