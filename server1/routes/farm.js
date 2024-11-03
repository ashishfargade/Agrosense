import express, { Router } from "express";
import { check, validationResult } from "express-validator";

import jwtauth from "../middleware/jwtauth.js";
import User from "../models/User.js";

const router = Router();

// @route POST /farm/new
// @desc ADD FARM
// @access PRIVATE
router.put(
    "/new",
    [
        jwtauth,
        check("farmName", "Farmname is required").not().isEmpty(),
        check("area", "area is required").not().isEmpty(),
        check("soilType", "soil type is required").not().isEmpty(),
        check("location", "location required").not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { farmName, area, soilType, location, currentCrop } = req.body();

        try {
            const userId = req.user.id;

            const newFarm = {
                farmName,
                area,
                soilType,
                location,
                currentCrop,
            };

            const user = await User.findByIdAndUpdate(
                userId,
                { $push: { farms: newFarm } },
                { new: true }
            );

            if (!user) {
                console.log("User not found");
                return res.status(404).json({ msg: "User not found" });
            }

            res.status(201).json(user);
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Server Error");
        }

        console.log(req.body);
    }
);

// @route DELETE /farm/delete
// @desc delete FARM
// @access PRIVATE
router.delete("/delete/:farmId", jwtauth, async (req, res) => {
    const { farmId } = req.params;

    try {
        const userId = req.user.id;

        const user = await User.findByIdAndUpdate(
            userId,
            { $pull: { farms: { _id: farmId } } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.status(201).json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});
