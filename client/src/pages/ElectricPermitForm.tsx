import React, { useState } from "react";

/**
 * ElectricPermitForm.tsx
 * - Tailwind CSS required in the project
 * - Minimal, accessible form structure modeled after IS 17893 guidance and the provided screenshots.
 *
 * Extend validation, submission and integration as needed.
 */
interface ElectricPermitFormProps {
  onCreated?: () => void;
} 
interface Attendee {
  name: string;
  phone: string;
}

export default function ElectricPermitForm({ onCreated }: ElectricPermitFormProps) {
  const [permitNo, setPermitNo] = useState("");
  const [date, setDate] = useState("");
  const [responsiblePerson, setResponsiblePerson] = useState("");
  const [workLocation, setWorkLocation] = useState("");
  const [workDescription, setWorkDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [finishDate, setFinishDate] = useState("");
  const [finishTime, setFinishTime] = useState("");
  const [fallProtectionType, setFallProtectionType] = useState("");
  const [arrestCatches, setArrestCatches] = useState<"yes" | "no" | "">("");
  const [craneNearLadder, setCraneNearLadder] = useState(false);
  
  const [workEnvironment, setWorkEnvironment] = useState("");
  const [hazardAssessed, setHazardAssessed] = useState(false);
  const [workCanProceed, setWorkCanProceed] = useState(false);
  const [onCraneDescribe, setOnCraneDescribe] = useState("");
  const [onOtherDescribe, setOnOtherDescribe] = useState("");

  // PPEs
  const [harnessDate, setHarnessDate] = useState("");
  const [harnessChecked, setHarnessChecked] = useState(false);
  const [shoesDate, setShoesDate] = useState("");
  const [shoesChecked, setShoesChecked] = useState(false);
  const [helmetDate, setHelmetDate] = useState("");
  const [helmetChecked, setHelmetChecked] = useState(false);

  // Method of access
  const [accessMethods, setAccessMethods] = useState<Record<string, boolean>>({
    fixedLadder: false,
    elevatedPlatform: false,
    scissorLift: false,
    boomLifter: false,
    catwalk: false,
  });
  const [surroundingHazardNotes, setSurroundingHazardNotes] = useState("");
  const [keyControlMeasure, setKeyControlMeasure] = useState("");

  // Isolation
  const [electricalIsolationObtained, setElectricalIsolationObtained] = useState<
    "yes" | "no" | ""
  >("");
  const [isolationFrom, setIsolationFrom] = useState("");
  const [isolationTo, setIsolationTo] = useState("");
  const [otherIsolationDescribe, setOtherIsolationDescribe] = useState("");
  const [otherIsolationRequired, setOtherIsolationRequired] = useState(false);

  // Authorisation
  const [authoriserName, setAuthoriserName] = useState("");
  const [authoriserDate, setAuthoriserDate] = useState("");

  // Attendees

  function updateAccessMethod(key: string) {
    setAccessMethods((s) => ({ ...s, [key]: !s[key] }));
  }

  // Attendees state
const [attendees, setAttendees] = useState<Attendee[]>(
  Array(5).fill(null).map(() => ({ name: "", phone: "" }))
);

// Update attendee at index
const updateAttendee = (index: number, field: keyof Attendee, value: string) => {
  const newAttendees = [...attendees];
  newAttendees[index] = { ...newAttendees[index], [field]: value };
  setAttendees(newAttendees);
};

// Add new attendee row
const addAttendeeRow = () => {
  setAttendees([...attendees, { name: "", phone: "" }]);
};


  function handleReset() {
    // Reset everything (simple)
    setPermitNo("");
    setDate("");
    setResponsiblePerson("");
    setWorkLocation("");
    setWorkDescription("");
    setStartDate("");
    setStartTime("");
    setFinishDate("");
    setFinishTime("");
    setFallProtectionType("");
    setArrestCatches("");
    setCraneNearLadder(false);
    setWorkEnvironment("");
    setHazardAssessed(false);
    setWorkCanProceed(false);
    setOnCraneDescribe("");
    setOnOtherDescribe("");
    setHarnessDate("");
    setHarnessChecked(false);
    setShoesDate("");
    setShoesChecked(false);
    setHelmetDate("");
    setHelmetChecked(false);
    setAccessMethods({
      fixedLadder: false,
      elevatedPlatform: false,
      scissorLift: false,
      boomLifter: false,
      catwalk: false,
    });
    setSurroundingHazardNotes("");
    setKeyControlMeasure("");
    setElectricalIsolationObtained("");
    setIsolationFrom("");
    setIsolationTo("");
    setOtherIsolationDescribe("");
    setOtherIsolationRequired(false);
    setAuthoriserName("");
    setAuthoriserDate("");
    setAttendees(Array(5).fill(null).map(() => ({ name: "", phone: "" })));

  }

  function handleCreatePermit(e: React.FormEvent) {
    e.preventDefault();
    // Minimal validation example
    if (!permitNo || !date || !workLocation) {
      alert("Please fill Permit No, Date and Work Location.");
      return;
    }

    const payload = {
      permitNo,
      date,
      responsiblePerson,
      workLocation,
      workDescription,
      schedule: { startDate, startTime, finishDate, finishTime },
      fallProtection: { fallProtectionType, arrestCatches, craneNearLadder },
      workContext: {
        workEnvironment,
        hazardAssessed,
        workCanProceed,
        onCraneDescribe,
        onOtherDescribe,
      },
      ppes: {
        harness: { harnessDate, harnessChecked },
        shoes: { shoesDate, shoesChecked },
        helmet: { helmetDate, helmetChecked },
      },
      accessMethods,
      surroundingHazardNotes,
      keyControlMeasure,
      isolation: {
        electricalIsolationObtained,
        isolationFrom,
        isolationTo,
        otherIsolationDescribe,
        otherIsolationRequired,
      },
      authoriser: { authoriserName, authoriserDate },
      attendees,
    };

    console.log("Permit payload:", payload);
    alert("Permit created (see console). Extend handler to POST to your backend.");
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-center text-slate-800">
          Create Electrical Permit
        </h1>
        <p className="text-sm text-center text-slate-500 mb-6">
          Fill the form below to create a Electrical work permit
        </p>

        <form onSubmit={handleCreatePermit} className="space-y-6">
          {/* Top row: permit, date, responsible */}
          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-5">
              <label className="block text-sm font-medium text-slate-700">Permit No.</label>
              <input
                className="mt-1 block w-full border rounded-md px-3 py-2 text-sm"
                value={permitNo}
                onChange={(e) => setPermitNo(e.target.value)}
                placeholder="Enter permit number"
              />
            </div>
            <div className="col-span-4">
              <label className="block text-sm font-medium text-slate-700">Date</label>
              <input
                type="date"
                className="mt-1 block w-full border rounded-md px-3 py-2 text-sm"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="col-span-3">
              <label className="block text-sm font-medium text-slate-700">
                Person responsible for work
              </label>
              <div className="mt-1 flex gap-2 items-center text-sm">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="responsible"
                    value="SSE (MW)"
                    checked={responsiblePerson === "SSE (MW)"}
                    onChange={(e) => setResponsiblePerson(e.target.value)}
                  />
                  SSE (MW)
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="responsible"
                    value="SSW (Substation)"
                    checked={responsiblePerson === "SSW (Substation)"}
                    onChange={(e) => setResponsiblePerson(e.target.value)}
                  />
                  SSW (Substation)
                </label>
              </div>
            </div>
          </div>

          {/* Work Location & Description */}
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <label className="block text-sm font-medium text-slate-700">Work Location</label>
              <input
                className="mt-1 block w-full border rounded-md px-3 py-2 text-sm"
                value={workLocation}
                onChange={(e) => setWorkLocation(e.target.value)}
                placeholder="e.g. Bay 3 - Panel A"
              />
            </div>
            <div className="col-span-6">
              <label className="block text-sm font-medium text-slate-700">Work Description</label>
              <input
                className="mt-1 block w-full border rounded-md px-3 py-2 text-sm"
                value={workDescription}
                onChange={(e) => setWorkDescription(e.target.value)}
                placeholder="Describe the electrical task"
              />
            </div>
          </div>

          {/* Schedule */}
          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Schedule</h3>
            <div className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-3">
                <label className="block text-xs text-slate-600">Start Date</label>
                <input type="date" className="mt-1 block w-full border rounded-md px-3 py-2 text-sm" value={startDate} onChange={(e)=>setStartDate(e.target.value)} />
              </div>
              <div className="col-span-3">
                <label className="block text-xs text-slate-600">Start Time</label>
                <input type="time" className="mt-1 block w-full border rounded-md px-3 py-2 text-sm" value={startTime} onChange={(e)=>setStartTime(e.target.value)} />
              </div>
              <div className="col-span-3">
                <label className="block text-xs text-slate-600">Finish Date</label>
                <input type="date" className="mt-1 block w-full border rounded-md px-3 py-2 text-sm" value={finishDate} onChange={(e)=>setFinishDate(e.target.value)} />
              </div>
              <div className="col-span-3">
                <label className="block text-xs text-slate-600">Finish Time</label>
                <input type="time" className="mt-1 block w-full border rounded-md px-3 py-2 text-sm" value={finishTime} onChange={(e)=>setFinishTime(e.target.value)} />
              </div>
            </div>
          </div>

          {/* Fall protection */}
          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Indicate Fall Protection System</h3>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-6">
                <label className="block text-xs text-slate-600">Type of system / Description</label>
                <input className="mt-1 block w-full border rounded-md px-3 py-2 text-sm" value={fallProtectionType} onChange={(e)=>setFallProtectionType(e.target.value)} placeholder="e.g., full body harness & lifeline" />
              </div>
              <div className="col-span-3">
                <label className="block text-xs text-slate-600">Does not arrest fall (catches after fall)</label>
                <div className="mt-1 flex gap-3 items-center">
                  <label className="flex items-center gap-2 text-sm"><input type="radio" name="arrest" value="yes" checked={arrestCatches==='yes'} onChange={()=>setArrestCatches('yes')} /> Yes</label>
                  <label className="flex items-center gap-2 text-sm"><input type="radio" name="arrest" value="no" checked={arrestCatches==='no'} onChange={()=>setArrestCatches('no')} /> No</label>
                </div>
              </div>
              <div className="col-span-3 flex items-center">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={craneNearLadder} onChange={(e)=>setCraneNearLadder(e.target.checked)} />
                  Certified that crane is placed near Fixed ladder
                </label>
              </div>
            </div>
          </div>

          {/* Work Context */}
          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Work Context</h3>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-4">
                <label className="block text-xs text-slate-600">I will be working in the following environment</label>
                <input className="mt-1 block w-full border rounded-md px-3 py-2 text-sm" value={workEnvironment} onChange={(e)=>setWorkEnvironment(e.target.value)} placeholder="e.g. On a crane / Other" />
                <div className="mt-2 flex gap-4">
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={hazardAssessed} onChange={(e)=>setHazardAssessed(e.target.checked)} /> Hazard assessed</label>
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={workCanProceed} onChange={(e)=>setWorkCanProceed(e.target.checked)} /> Work can Proceed</label>
                </div>
              </div>
              <div className="col-span-4">
                <label className="block text-xs text-slate-600">On a crane: Describe</label>
                <textarea className="mt-1 block w-full border rounded-md px-3 py-2 text-sm" rows={3} value={onCraneDescribe} onChange={(e)=>setOnCraneDescribe(e.target.value)} />
              </div>
              <div className="col-span-4">
                <label className="block text-xs text-slate-600">On other: Describe</label>
                <textarea className="mt-1 block w-full border rounded-md px-3 py-2 text-sm" rows={3} value={onOtherDescribe} onChange={(e)=>setOnOtherDescribe(e.target.value)} />
              </div>
            </div>
          </div>

          {/* PPEs */}
          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Indicate type of fall protection to be used (PPE's)</h3>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-4 border rounded-md p-4">
                <div className="font-medium text-sm">Full body harness (fall arresting type)</div>
                <label className="block text-xs text-slate-600 mt-3">Issued On Date</label>
                <input type="date" className="mt-1 block w-full border rounded-md px-3 py-2 text-sm" value={harnessDate} onChange={(e)=>setHarnessDate(e.target.value)} />
                <label className="flex items-center gap-2 mt-3 text-sm"><input type="checkbox" checked={harnessChecked} onChange={(e)=>setHarnessChecked(e.target.checked)} /> Checked / inspected</label>
              </div>

              <div className="col-span-4 border rounded-md p-4">
                <div className="font-medium text-sm">Safety Shoes</div>
                <label className="block text-xs text-slate-600 mt-3">Issued On Date</label>
                <input type="date" className="mt-1 block w-full border rounded-md px-3 py-2 text-sm" value={shoesDate} onChange={(e)=>setShoesDate(e.target.value)} />
                <label className="flex items-center gap-2 mt-3 text-sm"><input type="checkbox" checked={shoesChecked} onChange={(e)=>setShoesChecked(e.target.checked)} /> Checked / inspected</label>
              </div>

              <div className="col-span-4 border rounded-md p-4">
                <div className="font-medium text-sm">Safety Helmet</div>
                <label className="block text-xs text-slate-600 mt-3">Issued On Date</label>
                <input type="date" className="mt-1 block w-full border rounded-md px-3 py-2 text-sm" value={helmetDate} onChange={(e)=>setHelmetDate(e.target.value)} />
                <label className="flex items-center gap-2 mt-3 text-sm"><input type="checkbox" checked={helmetChecked} onChange={(e)=>setHelmetChecked(e.target.checked)} /> Checked / inspected</label>
              </div>
            </div>
          </div>

          {/* Method of Access */}
          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Method of Access to Target Work Position</h3>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-4 border rounded-md p-4">
                <div className="text-sm font-medium mb-2">Method of Accessed</div>
                <div className="flex flex-col gap-2 text-sm">
                  <label className="flex items-center gap-2"><input type="checkbox" checked={accessMethods.fixedLadder} onChange={()=>updateAccessMethod('fixedLadder')} /> Fixed Ladder</label>
                  <label className="flex items-center gap-2"><input type="checkbox" checked={accessMethods.elevatedPlatform} onChange={()=>updateAccessMethod('elevatedPlatform')} /> Elevated work platform</label>
                  <label className="flex items-center gap-2"><input type="checkbox" checked={accessMethods.scissorLift} onChange={()=>updateAccessMethod('scissorLift')} /> Scissor lift (stable work platform)</label>
                  <label className="flex items-center gap-2"><input type="checkbox" checked={accessMethods.boomLifter} onChange={()=>updateAccessMethod('boomLifter')} /> Boom Lifter platform</label>
                  <label className="flex items-center gap-2"><input type="checkbox" checked={accessMethods.catwalk} onChange={()=>updateAccessMethod('catwalk')} /> Catwalk</label>
                </div>
              </div>

              <div className="col-span-4 border rounded-md p-4">
                <div className="font-medium text-sm mb-2">Checked / Surrounding Hazard control</div>
                <textarea className="block w-full mt-1 border rounded-md px-3 py-2 text-sm" rows={6} value={surroundingHazardNotes} onChange={(e)=>setSurroundingHazardNotes(e.target.value)} placeholder="Notes on surrounding hazard control" />
              </div>

              <div className="col-span-4 border rounded-md p-4">
                <div className="font-medium text-sm mb-2">Key Control measure</div>
                <textarea className="block w-full mt-1 border rounded-md px-3 py-2 text-sm" rows={6} value={keyControlMeasure} onChange={(e)=>setKeyControlMeasure(e.target.value)} placeholder="e.g. Other person available at foot of ladder, adjustable lanyard & available" />
              </div>
            </div>
          </div>

          {/* Isolation */}
          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Isolation and Block Required</h3>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-4 border rounded-md p-4">
                <div className="text-sm font-medium">Electrical Isolation / Block obtained</div>
                <div className="mt-2 flex gap-3 items-center">
                  <label className="flex items-center gap-2"><input type="radio" name="isolation" value="yes" checked={electricalIsolationObtained==='yes'} onChange={()=>setElectricalIsolationObtained('yes')}/> Yes</label>
                  <label className="flex items-center gap-2"><input type="radio" name="isolation" value="no" checked={electricalIsolationObtained==='no'} onChange={()=>setElectricalIsolationObtained('no')}/> No</label>
                </div>
                <div className="mt-3 text-xs text-slate-600">If Yes indicate Isolation Time</div>
                <div className="mt-2 flex gap-2">
                  <input type="datetime-local" className="block w-1/2 border rounded-md px-3 py-2 text-sm" value={isolationFrom} onChange={(e)=>setIsolationFrom(e.target.value)} />
                  <input type="datetime-local" className="block w-1/2 border rounded-md px-3 py-2 text-sm" value={isolationTo} onChange={(e)=>setIsolationTo(e.target.value)} />
                </div>
              </div>

              <div className="col-span-8 border rounded-md p-4">
                <div className="flex items-start justify-between">
                  <div className="font-medium text-sm">Other Kind of Block / isolation required</div>
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={otherIsolationRequired} onChange={(e)=>setOtherIsolationRequired(e.target.checked)} /> Yes / No</label>
                </div>
                <textarea className="block w-full mt-3 border rounded-md px-3 py-2 text-sm" rows={4} value={otherIsolationDescribe} onChange={(e)=>setOtherIsolationDescribe(e.target.value)} placeholder="Describe other block/isolation" />
              </div>
            </div>
          </div>

          {/* Authorisation and attendees */}
          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Authorisation / Signatures</h3>
            <div className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-6">
                <label className="block text-xs text-slate-600">Name of person authorising for work</label>
                <input className="mt-1 block w-full border rounded-md px-3 py-2 text-sm" value={authoriserName} onChange={(e)=>setAuthoriserName(e.target.value)} />
              </div>
              <div className="col-span-3">
                <label className="block text-xs text-slate-600">Date (authoriser signature)</label>
                <input type="date" className="mt-1 block w-full border rounded-md px-3 py-2 text-sm" value={authoriserDate} onChange={(e)=>setAuthoriserDate(e.target.value)} />
              </div>
            </div>
            <br/>
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
          {attendees.map((attendee, index) => (
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
          

          {/* Footer buttons */}
          <div className="flex justify-end gap-4">
            <button type="button" onClick={handleReset} className="border rounded-md px-4 py-2 text-sm">Reset Console</button>
            <button type="submit" className="bg-blue-600 text-white rounded-md px-4 py-2 text-sm">Create Permit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
