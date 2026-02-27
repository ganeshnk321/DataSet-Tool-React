import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
export default function DataTool() {
  const [baseData, setBaseData] = useState("");
  const [changeData, setChangeData] = useState("");
  const [result, setResult] = useState("");

  // Helper → Convert textarea input into clean array
  const parseData = (data) =>
    data
      .split(/\n|,/) // supports comma or new line
      .map((item) => item.trim())
      .filter((item) => item !== "");

  // ADD OPERATION
  const handleAdd = () => {
    const baseArray = parseData(baseData);
    const changeArray = parseData(changeData);

    const baseSet = new Set(baseArray);
    let addedCount = 0;

    changeArray.forEach((item) => {
      if (!baseSet.has(item)) {
        baseSet.add(item);
        addedCount++;
      }
    });

    const finalArray = Array.from(baseSet);

    setResult(`ADD OPERATION COMPLETED\n-------------------------\nAdded Count: ${addedCount}\nFinal Count: ${finalArray.length}\n\nUPDATED DATA:\n${finalArray.join("\n")}`);
  };

  // REMOVE OPERATION
  const handleRemove = () => {
    const baseArray = parseData(baseData);
    const changeArray = new Set(parseData(changeData));

    let removedCount = 0;

    const finalArray = baseArray.filter((item) => {
      if (changeArray.has(item)) {
        removedCount++;
        return false;
      }
      return true;
    });

    setResult(`REMOVE OPERATION COMPLETED\n----------------------------\nRemoved Count: ${removedCount}\nFinal Count: ${finalArray.length}\n\nUPDATED DATA:\n${finalArray.join("\n")}`);
  };

  // COMPARE DATASETS
  const handleCompare = () => {
    const baseArray = parseData(baseData);
    const changeArray = parseData(changeData);

    const baseSet = new Set(baseArray);

    const present = [];
    const notPresent = [];

    changeArray.forEach((item) => {
      if (baseSet.has(item)) present.push(item);
      else notPresent.push(item);
    });

    setResult(`COMPARE RESULT\n----------------\nPresent in Base: ${present.length}\nNot Present in Base: ${notPresent.length}\n\nPRESENT DATA:\n${present.join("\n")}

NOT PRESENT DATA:\n${notPresent.join("\n")}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl"
      >
        <Card className="rounded-2xl shadow-xl p-6">
          <CardContent className="space-y-6">
            <h1 className="text-2xl font-semibold text-center">
              Dataset Management Tool
            </h1>

            <div className="grid md:grid-cols-3 gap-6">
              {/* BASE DATA */}
              <div className="space-y-2">
                <h2 className="font-medium">1️⃣ Base Data</h2>
                <Textarea
                  placeholder="Paste base dataset here"
                  value={baseData}
                  onChange={(e) => setBaseData(e.target.value)}
                  className="min-h-[260px]"
                />
              </div>

              {/* CHANGE DATA + BUTTONS */}
              <div className="space-y-4">
                <div>
                  <h2 className="font-medium">2️⃣ Add / Remove / Compare Data</h2>
                  <Textarea
                    placeholder="Paste data to process"
                    value={changeData}
                    onChange={(e) => setChangeData(e.target.value)}
                    className="min-h-[200px]"
                  />
                </div>

                <div className="flex flex-wrap gap-3 justify-center">
                  <Button onClick={handleAdd}>Add</Button>
                  <Button onClick={handleRemove} variant="destructive">Remove</Button>
                  <Button onClick={handleCompare}>Compare</Button>
                </div>
              </div>

              {/* RESULT */}
              <div className="space-y-2">
                <h2 className="font-medium">3️⃣ Processed Result</h2>
                <Textarea
                  placeholder="Results will appear here"
                  value={result}
                  readOnly
                  className="min-h-[260px] bg-gray-50 font-mono"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
