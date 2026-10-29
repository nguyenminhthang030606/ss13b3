let ticket = {
    passengerName: "Nguyen Van A",
    ticketClass: "ECONOMY",
    memberLevel: "Titan"
};

let baggageList = [
    {
        name: "Vali 1",
        weight: 18,
        type: "NORMAL"
    },
    {
        name: "Dan Guitar",
        weight: 6,
        type: "OVERSIZE"
    },
    {
        name: "Long Thu Cung",
        weight: 4,
        type: "PET"
    }
];

function calculateBaggageSurcharge(ticket, baggageList) {
    let freeWeight = ticket.ticketClass === "BUSINESS" ? 30 : 20;

    if (
        ticket.memberLevel === "Titan" ||
        ticket.memberLevel === "Gold" ||
        ticket.memberLevel === "Platinum"
    ) {
        freeWeight += 10;
    }

    let totalWeight = baggageList.reduce(
        (sum, baggage) => sum + baggage.weight,
        0
    );

    let excessWeight = Math.max(0, totalWeight - freeWeight);

    let overweightFee = 0;

    if (excessWeight > 0) {
        if (excessWeight <= 5) {
            overweightFee = excessWeight * 60000;
        } else {
            overweightFee =
                5 * 60000 +
                (excessWeight - 5) * 80000;
        }
    }

    let specialFee = 0;

    baggageList.forEach(baggage => {
        if (baggage.type === "OVERSIZE") {
            specialFee += 200000;
        }

        if (baggage.type === "PET") {
            specialFee += 500000;
        }
    });

    return {
        totalWeight,
        freeWeight,
        excessWeight,
        overweightFee,
        specialFee,
        totalFee: overweightFee + specialFee
    };
}

function printReceipt(ticket, baggageList) {
    let result = calculateBaggageSurcharge(
        ticket,
        baggageList
    );

    console.log("=".repeat(50));
    console.log("        HOA DON THU PHI HANH LY");
    console.log("=".repeat(50));

    console.log(
        `Hanh khach   : ${ticket.passengerName}`
    );

    console.log(
        `Hang ve      : ${ticket.ticketClass}`
    );

    console.log(
        `Hoi vien     : ${ticket.memberLevel}`
    );

    console.log("-".repeat(50));

    baggageList.forEach((item, index) => {
        console.log(
            `${(index + 1 + ". " + item.name).padEnd(25)}${String(item.weight).padStart(5)} kg`
        );
    });

    console.log("-".repeat(50));

    console.log(
        `${"Tong trong luong".padEnd(30)}${String(result.totalWeight).padStart(5)} kg`
    );

    console.log(
        `${"Mien cuoc".padEnd(30)}${String(result.freeWeight).padStart(5)} kg`
    );

    console.log(
        `${"Vuot cuoc".padEnd(30)}${String(result.excessWeight).padStart(5)} kg`
    );

    console.log(
        `${"Phi qua can".padEnd(30)}${result.overweightFee.toLocaleString()} VND`
    );

    console.log(
        `${"Phi dac biet".padEnd(30)}${result.specialFee.toLocaleString()} VND`
    );

    console.log("-".repeat(50));

    console.log(
        `${"TONG THANH TOAN".padEnd(30)}${result.totalFee.toLocaleString()} VND`
    );

    console.log("=".repeat(50));
}

printReceipt(ticket, baggageList);