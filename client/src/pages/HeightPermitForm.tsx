import React, { useState } from "react";

type PPE = { name: string; issuedOn?: string; checked?: boolean };
interface Attendee {
  name: string;
  phone: string;
}

interface HeightPermitFormProps {
  onCreated?: () => void; // callback for parent
}

export default function HeightPermitForm({
  onCreated,
}: HeightPermitFormProps): JSX.Element {
  const [form, setForm] = useState({
    permitNo: "",
    date: "",
    personResponsible: "",
    workLocation: "",
    workDescription: "",
    startDate: "",
    startTime: "",
    finishDate: "",
    finishTime: "",
    fallSystemDescription: "",
    fallDoesNotArrest: "" as string | "yes" | "no",
    certifiedCraneNearLadder: false,
    hazardAssessed: false,
    workCanProceed: false,
    onCraneDescribe: "",
    otherDescribe: "",
    methodOfAccess: {
      fixedLadder: false,
      elevatedWorkPlatform: false,
      scissorLift: false,
      boomLifter: false,
      catwalk: false,
    },
    fixedLadder_otherPersonAtFoot: "",
    fixedLadder_adjustableLanyard: "",
    electricalIsolationObtained: "" as string | "yes" | "no",
    isolationFrom: "",
    isolationTo: "",
    otherBlockRequired: false,
    otherBlockDescribe: "",
    attendees: Array(5).fill({ name: "", phone: "" }) as Attendee[],
    authorizerName: "",
    authorizerSignatureDate: "",
  });

  const [ppes, setPpes] = useState<PPE[]>([
    {
      name: "Full body harness (fall arresting type)",
      issuedOn: "",
      checked: false,
    },
    { name: "Safety Shoes", issuedOn: "", checked: false },
    { name: "Safety Helmet", issuedOn: "", checked: false },
  ]);

  const [status, setStatus] = useState<"idle" | "created" | "pending">("idle");

  // ------------------- helpers -------------------
  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function updateMethodOfAccess(
    key: keyof typeof form.methodOfAccess,
    val: boolean
  ) {
    setForm((f) => ({
      ...f,
      methodOfAccess: { ...f.methodOfAccess, [key]: val },
    }));
  }

  function updatePpe(index: number, patch: Partial<PPE>) {
    setPpes((p) => p.map((pp, i) => (i === index ? { ...pp, ...patch } : pp)));
  }

  const updateAttendee = (index: number, field: keyof Attendee, value: string) => {
    const newAttendees = [...form.attendees];
    newAttendees[index] = { ...newAttendees[index], [field]: value };
    setForm({ ...form, attendees: newAttendees });
  };

  const addAttendeeRow = () => {
    setForm({
      ...form,
      attendees: [...form.attendees, { name: "", phone: "" }],
    });
  };

  // ------------------- submit -------------------
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await fetch("/api/permits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form, ppes }),
      });
      if (!res.ok) throw new Error("Failed to save");

      const saved = await res.json();
      console.log("Saved Permit:", saved);

      setStatus("created");

      // After 2s, mark as pending & notify 
      setTimeout(() => {
        setStatus("pending");
        if (onCreated) onCreated();
      }, 2000);
    } catch (err) {
      console.error(err);
      alert("Failed to save permit");
    }
  }

  // ------------------- UI -------------------
  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center py-12 px-6">
      <div className="max-w-5xl w-full">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800">
            Create Height Permit
          </h1>
          <p className="text-gray-500 mt-2">
            Fill the form below to create a Work at Height permit
          </p>
        </header>

        {/* Status Banner */}
        {status !== "idle" && (
          <div
            className={`mb-6 text-center px-4 py-2 rounded-lg ${
              status === "created"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {status === "created" ? "Permit Created ✅" : "Pending ⏳"}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-2xl p-8 space-y-8"
        >
          {/* Permit No / Date / Responsible */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="flex flex-col">
              <span className="text-sm text-gray-600">Permit No.</span>
              <input
                value={form.permitNo}
                onChange={(e) => update("permitNo", e.target.value)}
                className="mt-1 p-3 border rounded-lg"
                
              />
            </label>
            <label className="flex flex-col">
              <span className="text-sm text-gray-600">Date</span>
              <input
                type="date"
                value={form.date}
                onChange={(e) => update("date", e.target.value)}
                className="mt-1 p-3 border rounded-lg"
                
              />
            </label>
            <div className="flex flex-col">
              <span className="text-sm text-gray-600">
                Person responsible for work
              </span>
              <div className="mt-1 flex space-x-4 items-center">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="personResponsible"
                    checked={form.personResponsible === "SSE (MW)"}
                    onChange={() => update("personResponsible", "SSE (MW)")}
                    
                  />
                  <span className="ml-2">SSE (MW)</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="personResponsible"
                    checked={form.personResponsible === "SSW (Substation)"}
                    onChange={() =>
                      update("personResponsible", "SSW (Substation)")
                    }
                    
                  />
                  <span className="ml-2">SSW (Substation)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Work Details */}
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <label className="flex flex-col">
                    <span className="text-sm text-gray-600">Work Location</span>
                    <input
                    value={form.workLocation}
                    onChange={(e) => update("workLocation", e.target.value)}
                    className="mt-1 p-3 border rounded-lg"
                    
                    />
                </label>

                <label className="flex flex-col">
                    <span className="text-sm text-gray-600">Work Description</span>
                    <input
                    value={form.workDescription}
                    onChange={(e) => update("workDescription", e.target.value)}
                    className="mt-1 p-3 border rounded-lg"
                    
                    />
                </label>
            </div>
          </div>

          {/* Schedule */}
          <section className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-2">Schedule</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <label className="flex flex-col">
              <span className="text-sm">Start Date</span>
              <input
                type="date"
                value={form.startDate}
                onChange={(e) => update("startDate", e.target.value)}
                className="p-2 border rounded-lg"
                
              />
            </label>
            <label className="flex flex-col">
              <span className="text-sm">Start Time</span>
              <input
                type="time"
                value={form.startTime}
                onChange={(e) => update("startTime", e.target.value)}
                className="p-2 border rounded-lg"
                
              />
            </label>
            <label className="flex flex-col">
              <span className="text-sm">Finish Date</span>
              <input
                type="date"
                value={form.finishDate}
                onChange={(e) => update("finishDate", e.target.value)}
                className="p-2 border rounded-lg"
                
              />
            </label>
            <label className="flex flex-col">
              <span className="text-sm">Finish Time</span>
              <input
                type="time"
                value={form.finishTime}
                onChange={(e) => update("finishTime", e.target.value)}
                className="p-2 border rounded-lg"
                
              />
            </label>
          </div>
        </section>
        {/* Fall protection system */}
          <section className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-2">Indicate of Fall protection system</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className="flex flex-col">
                <span className="text-sm text-gray-600">Type of system / Description</span>
                <input value={form.fallSystemDescription} onChange={(e) => update("fallSystemDescription", e.target.value)} className="mt-1 p-3 border rounded-lg" />
              </label>

              <div className="flex flex-col">
                <span className="text-sm text-gray-600">Does not arrest fall (catches after fall)</span>
                <div className="mt-1 flex space-x-4 items-center">
                  <label className="inline-flex items-center">
                    <input type="radio" name="doesArrest" checked={form.fallDoesNotArrest === "yes"} onChange={() => update("fallDoesNotArrest", "yes")} />
                    <span className="ml-2">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input type="radio" name="doesArrest" checked={form.fallDoesNotArrest === "no"} onChange={() => update("fallDoesNotArrest", "no")} />
                    <span className="ml-2">No</span>
                  </label>
                </div>
              </div>

              <label className="flex items-center space-x-3">
                <input type="checkbox" checked={form.certifiedCraneNearLadder} onChange={(e) => update("certifiedCraneNearLadder", e.target.checked)} />
                <span className="text-gray-600">Certified that crane is placed near Fixed ladder</span>
              </label>
            </div>
          </section>

          {/* Work Context */}
          <section className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-2">Work Context</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <label className="flex flex-col">
                <span className="text-sm text-gray-600">I will Working in the following environment</span>
                <input placeholder="e.g. On a crane / Other" value={form.onCraneDescribe} onChange={(e) => update("onCraneDescribe", e.target.value)} className="mt-1 p-3 border rounded-lg" />
              </label>

              <label className="flex items-start space-x-3">
                <input type="checkbox" checked={form.hazardAssessed} onChange={(e) => update("hazardAssessed", e.target.checked)} />
                <div>
                  <div className="text-sm text-gray-600">Hazard assessed</div>
                </div>
              </label>

              <label className="flex items-start space-x-3">
                <input type="checkbox" checked={form.workCanProceed} onChange={(e) => update("workCanProceed", e.target.checked)} />
                <div>
                  <div className="text-sm text-gray-600">Work can Proceed</div>
                </div>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex flex-col">
                <span className="text-sm text-gray-600">On a crane: Describe</span>
                <input value={form.onCraneDescribe} onChange={(e) => update("onCraneDescribe", e.target.value)} className="mt-1 p-3 border rounded-lg"  />
              </label>

              <label className="flex flex-col">
                <span className="text-sm text-gray-600">On other: Describe</span>
                <input value={form.otherDescribe} onChange={(e) => update("otherDescribe", e.target.value)} className="mt-1 p-3 border rounded-lg"  />
              </label>
            </div>
          </section>
          {/* PPEs */}
          <section className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-2">Indicate type of fall protection to be used (PPE's)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {ppes.map((pp, i) => (
                <div key={i} className="p-4 border rounded-lg">
                  <div className="text-sm font-medium">{pp.name}</div>
                  <label className="mt-2 flex flex-col">
                    <span className="text-xs text-gray-500">Issued On Date</span>
                    <input type="date" value={pp.issuedOn} onChange={(e) => updatePpe(i, { issuedOn: e.target.value })} className="mt-1 p-2 border rounded-md" />
                  </label>
                  <label className="mt-3 inline-flex items-center">
                    <input type="checkbox" checked={!!pp.checked} onChange={(e) => updatePpe(i, { checked: e.target.checked })} />
                    <span className="ml-2 text-sm text-gray-600">Checked / inspected</span>
                  </label>
                </div>
              ))}
            </div>
          </section>

          {/* Method of access */}
          <section className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-2">Method of Access to Target Work Position</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <div className="font-medium mb-2">Method of Accessed</div>
                <label className="inline-flex items-center w-full justify-between py-2">
                  <span>Fixed Ladder</span>
                  <input type="checkbox" checked={form.methodOfAccess.fixedLadder} onChange={(e) => updateMethodOfAccess("fixedLadder", e.target.checked)} />
                </label>
                <label className="inline-flex items-center w-full justify-between py-2">
                  <span>Elevated work platform</span>
                  <input type="checkbox" checked={form.methodOfAccess.elevatedWorkPlatform} onChange={(e) => updateMethodOfAccess("elevatedWorkPlatform", e.target.checked)} />
                </label>
                <label className="inline-flex items-center w-full justify-between py-2">
                  <span>Scissor lift (stable work platform)</span>
                  <input type="checkbox" checked={form.methodOfAccess.scissorLift} onChange={(e) => updateMethodOfAccess("scissorLift", e.target.checked)} />
                </label>
                <label className="inline-flex items-center w-full justify-between py-2">
                  <span>Boom Lifter platform</span>
                  <input type="checkbox" checked={form.methodOfAccess.boomLifter} onChange={(e) => updateMethodOfAccess("boomLifter", e.target.checked)} />
                </label>
                <label className="inline-flex items-center w-full justify-between py-2">
                  <span>Catwalk</span>
                  <input type="checkbox" checked={form.methodOfAccess.catwalk} onChange={(e) => updateMethodOfAccess("catwalk", e.target.checked)} />
                </label>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="font-medium mb-2">Checked / Surrounding Hazard control</div>
                <textarea value={form.fixedLadder_otherPersonAtFoot} onChange={(e) => update("fixedLadder_otherPersonAtFoot", e.target.value)} className="w-full p-2 border rounded-md h-32" placeholder="Notes on surrounding hazard control" />
              </div>

              <div className="p-4 border rounded-lg">
                <div className="font-medium mb-2">Key Control measure</div>
                <textarea value={form.fixedLadder_adjustableLanyard} onChange={(e) => update("fixedLadder_adjustableLanyard", e.target.value)} className="w-full p-2 border rounded-md h-32" placeholder="e.g. Other person available at foot of ladder, adjustable lanyard & available" />
              </div>
            </div>
          </section>

          {/* Isolation and block required */}
          <section className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-2">Isolation and Block Required</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <div className="text-sm">Electrical Isolation / Block obtained</div>
                <div className="mt-2 flex items-center space-x-4">
                  <label className="inline-flex items-center">
                    <input type="radio" name="electricalIsolation" checked={form.electricalIsolationObtained === "yes"} onChange={() => update("electricalIsolationObtained", "yes")} />
                    <span className="ml-2">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input type="radio" name="electricalIsolation" checked={form.electricalIsolationObtained === "no"} onChange={() => update("electricalIsolationObtained", "no")} />
                    <span className="ml-2">No</span>
                  </label>
                </div>

                <div className="mt-4">
  <div className="text-xs text-gray-500">If Yes indicate Isolation Time</div>
  <div className="flex gap-2 mt-2">
    <input
      type="date"
      value={form.isolationFrom}
      onChange={(e) => update("isolationFrom", e.target.value)}
      className="p-2 border rounded-md w-[135px]"
      
    />
    <input
      type="date"
      value={form.isolationTo}
      onChange={(e) => update("isolationTo", e.target.value)}
      className="p-2 border rounded-md w-[135px]"
      
    />
  </div>
</div>

              </div>

              <div className="p-4 border rounded-lg col-span-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm">Other Kind of Block / isolation required</div>
                  <label className="inline-flex items-center">
                    <input type="checkbox" checked={form.otherBlockRequired} onChange={(e) => update("otherBlockRequired", e.target.checked)} />
                    <span className="ml-2 text-sm">Yes / No</span>
                  </label>
                </div>
                <textarea value={form.otherBlockDescribe} onChange={(e) => update("otherBlockDescribe", e.target.value)} className="w-full p-2 border rounded-md mt-3 h-28" placeholder="Describe other block/isolation" />
              </div>
            </div>
          </section>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
            <li>I am aware about the Associated Hazards and risk i.e (Fall from height, fall of object, slip and fall of tools and electrical shock.)</li>
            <li>Safety precaution for the associated Hazard ensured and are sufficient.</li>
            <li>Machine and tools which will be used are inspected and are suitable to work.</li>
        </ul>
          {/* Signatures & attendees */}
          <section className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-2">Permission to work</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
            <li>I agree to work within the condition indicated on this permit and accept the responsibility as person directly incharge of the work.</li>
            <li>I declare that all work at height will be carried out under close supervision and accordance with the condition of permit.</li>
            <li>The following staff are nominated to work for crane maintenance on height and they are trained and qualified for the work.</li>
            <li>They have been communicated about hazards and risk for work of crane maintenance on height.</li>
            </ul>
            <h3 className="font-semibold text-gray-700 mb-2">Authorisation / Signatures</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className="flex flex-col">
                <span className="text-sm text-gray-600">Name of person authorising for work</span>
                <input value={form.authorizerName} onChange={(e) => update("authorizerName", e.target.value)} className="mt-1 p-3 border rounded-lg" required/>
              </label>
              <label className="flex flex-col">
                <span className="text-sm text-gray-600">Date (authoriser signature)</span>
                <input type="date" value={form.authorizerSignatureDate} onChange={(e) => update("authorizerSignatureDate", e.target.value)} className="mt-1 p-3 border rounded-lg" required/>
              </label>
               <br />
              <div className="overflow-x-auto">
                <label className="flex flex-col">
                <span className="text-sm text-gray-600">Attendees Details</span>
              </label>
                <table className="table-auto w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-2">Sr. No</th>
                      <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Phone No</th>
          </tr>
        </thead>
        <tbody>
          {form.attendees.map((attendee, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2 text-center">{index + 1}</td>
              <td className="border border-gray-300 p-2">
                <input
                  type="text"
                  value={attendee.name}
                  onChange={(e) => updateAttendee(index, "name", e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </td>
              <td className="border border-gray-300 p-2">
                <input
                  type="text"
                  value={attendee.phone}
                  onChange={(e) => updateAttendee(index, "phone", e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={addAttendeeRow}
        className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Row
      </button>
    </div>
            </div>
          </section>
          <section>
            <h3 className="font-semibold text-gray-700 mb-2">Perimeter Authorization (User Shop)</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                <li>All staff working in the related area in my shop where communicated regarding the maintenance of crane and associated hazard/risk.</li>
                <li>Working area below the camera is declared for a barricaded by user shop and barricaded by the permitee SSE no work will be done a below the crane maintenance area and no crane will be operated without fitness certificate the completion/cancellation of permit.</li>
            </ul>
          </section>
          <div className="flex items-center justify-end space-x-3">
            <button type="button" onClick={() => console.clear()} className="px-4 py-2 border rounded-lg">Reset Console</button>
            <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow">Create Permit</button>
          </div>
        </form>
      </div>
    </div>
  );
}